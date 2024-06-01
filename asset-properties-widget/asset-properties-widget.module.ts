import { NgModule } from '@angular/core';
import {
  AlarmRealtimeService,
  CoreModule,
  EventRealtimeService,
  HOOK_COMPONENTS,
  MeasurementRealtimeService,
  OperationRealtimeService,
  RealtimeModule,
} from '@c8y/ngx-components';
import * as preview from './common/preview';
import { AssetPropertiesViewComponent } from './component/asset-properties-view/asset-properties-view.component';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubAssetsModule } from '@c8y/ngx-components/sub-assets';
import { DatapointSelectorModule } from '@c8y/ngx-components/datapoint-selector';
import { AssetPropertiesViewService } from './component/asset-properties-view/asset-properties-view.service';

@NgModule({
  declarations: [
    AssetPropertiesViewComponent,
  ],
  imports: [
    CoreModule,
    AssetSelectorModule,
    Ng2SearchPipeModule,
    DragDropModule,
    RealtimeModule,
    SubAssetsModule,
    DatapointSelectorModule,
  ],
  providers: [
    AssetPropertiesViewService,
    AlarmRealtimeService,
    EventRealtimeService,
    OperationRealtimeService,
    MeasurementRealtimeService,
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: 'asset-properties-widget',
        label: 'Device Enrolment',
        previewImage: preview.image,
        description: 'Enrol new devices using a one-time code',
        component: AssetPropertiesViewComponent,
        data: {
          ng1: {
            options: {
              noDeviceTarget: false,
              noNewWidgets: false,
              deviceTargetNotRequired: false,
              groupsSelectable: true,
              showUnassignedDevices: false,
              upgrade: true,
              configComponent: true,
              showChildDevices: false,
            },
          },
        },
      },
    },
  ],
})
export class DeviceRegistrationWidgetModule {}
