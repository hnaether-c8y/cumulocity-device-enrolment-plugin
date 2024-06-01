import { Injectable } from '@angular/core';
import {
  AlarmService,
  EventService,
  IAlarm,
  IEvent,
  IManagedObject,
  IMeasurement,
  IOperation,
  MeasurementService,
  OperationService,
  FetchClient,
  Client,
} from '@c8y/client';
import {
  AlarmRealtimeService,
  DatePipe,
  EventRealtimeService,
  MeasurementRealtimeService,
  OperationRealtimeService
} from '@c8y/ngx-components';
import { KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface RegistrationResponse {
  docker: string;
  device: string;
  token: string;
}

interface MeasurementValue {
  unit?: string;
  value: number;
  date: string;
  id: string;
}
@Injectable()
export class AssetPropertiesViewService {
  DEFAULT_FROM_DATE: string = '1970-01-01';
  private variableSubject = new Subject<any>();
  dateSet$ = this.variableSubject.asObservable();

  constructor(
    private c8yAlarms: AlarmService,
    private c8yEvents: EventService,
    private c8yApi: FetchClient,
    private c8yMeasurements: MeasurementService,
    private c8yOperation: OperationService,
    private measurementRealtime: MeasurementRealtimeService,
    private alarmRealtimeService: AlarmRealtimeService,
    private eventRealtimeService: EventRealtimeService,
    private operationRealtimeService: OperationRealtimeService,
    private datePipe: DatePipe
  ) {}

  async getRegistrationCode(name: string) {
    let response = await this.c8yApi.fetch(`/service/c8y-token-syner/token`, {
      method: "GET",
      params: {
        externalId: name
      },
    })
    const data = await response.json();
    return data;
  }

  async getAlarms(filters): Promise<IManagedObject[]> {
    let data = [];
    await this.c8yAlarms.list(filters).then(function (alarms) {
      data = alarms.data;
    });
    return data;
  }

  async getEvents(filters) {
    let data = [];
    await this.c8yEvents.list(filters).then(events => {
      data = events.data;
    });
    return data;
  }

  async getMeasurements(filters) {
    let data = [];
    await this.c8yMeasurements.list(filters).then(measurements => {
      data = measurements.data;
    });
    return data;
  }

  async getOperation(filters) {
    let data = [];
    await this.c8yOperation.list(filters).then(measurements => {
      data = measurements.data;
    });
    return data;
  }

  async getLastDeviceMessage(device: IManagedObject) {
    // By incrementing the dateTo parameter by 1 day, this code aims to mitigate timezone-related inconsistencies.
    const dateTimeFormat = 'yyyy-MM-ddThh:mm:ssZZZZZ';
    const filters = {
      dateFrom: this.DEFAULT_FROM_DATE,
      dateTo: this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), dateTimeFormat),
      source: device.id,
      pageSize: 2000
    };
    const [alarms, events, measurements, operations] = await Promise.all([
      this.getAlarms(filters),
      this.getEvents(filters),
      this.getMeasurements(filters),
      this.getOperation(filters)
    ]);

    const dateSet = new Set<string>();

    const updateDateSet = (items: any[], timestampProp: string) => {
      items.forEach(item => {
        dateSet.add(item[timestampProp]);
      });
    };

    updateDateSet(alarms, 'creationTime');
    updateDateSet(events, 'creationTime');
    updateDateSet(measurements, 'time');
    updateDateSet(operations, 'creationTime');

    this.updateTimeStamp(dateSet);

    const handleRealtimeUpdate = (item: any, timestampProp: string) => {
      dateSet.add(item[timestampProp]);
      this.updateTimeStamp(dateSet);
    };

    this.alarmRealtimeService.onCreate$(device.id).subscribe((alarm: IAlarm) => {
      handleRealtimeUpdate(alarm, 'creationTime');
    });

    this.eventRealtimeService.onCreate$(device.id).subscribe((event: IEvent) => {
      handleRealtimeUpdate(event, 'creationTime');
    });

    this.measurementRealtime.onCreate$(device.id).subscribe((measurement: IMeasurement) => {
      handleRealtimeUpdate(measurement, 'time');
    });

    this.operationRealtimeService.onCreate$(device.id).subscribe((operation: IOperation) => {
      handleRealtimeUpdate(operation, 'creationTime');
    });
  }

  updateTimeStamp(dateSet: Set<string>) {
    if (dateSet.size > 0) {
      this.variableSubject.next(dateSet);
    }
  }

  getLatestMeasurement$(datapoint: KPIDetails): Observable<MeasurementValue> {
    return this.measurementRealtime
      .latestValueOfSpecificMeasurement$(
        datapoint.fragment,
        datapoint.series,
        datapoint.__target.id,
        // we only need the last two values in case we want to show a trend
        1
      )
      .pipe(
        filter(measurement => !!measurement),
        map(measurement => {
          return {
            unit: measurement[datapoint.fragment][datapoint.series].unit,
            value: measurement[datapoint.fragment][datapoint.series].value,
            date: measurement.time as string,
            id: datapoint.uniqId
          };
        })
      );
  }
}
