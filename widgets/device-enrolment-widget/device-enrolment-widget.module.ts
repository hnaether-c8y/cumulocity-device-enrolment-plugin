import { NgModule } from '@angular/core';
import {
  CoreModule,
  hookComponent,
} from '@c8y/ngx-components';
import { DeviceEnrolmentViewComponent } from './component/device-enrolment-view/device-enrolment-view.component'
import { DeviceEnrolmentViewService } from './component/device-enrolment-view/device-enrolment-view.service';
import { DeviceEnrolmentModalModule } from '../device-enrolment-modal/device-enrolment-modal.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    DeviceEnrolmentViewComponent,
  ],
  imports: [
    CoreModule,
    ModalModule,
    DeviceEnrolmentModalModule,
  ],
  providers: [
    DeviceEnrolmentViewService,
    hookComponent({
      id: 'device-enrolment-widget',
      label: 'Device Enrolment',
      // previewImage: preview.image,
      description: 'Enrol new devices using a one-time code',
      component: DeviceEnrolmentViewComponent,
      data: {
        ng1: {
          options: {
            noDeviceTarget: true,
            noNewWidgets: false,
            deviceTargetNotRequired: true,
            groupsSelectable: false,
            showUnassignedDevices: false,
            upgrade: true,
            configComponent: false,
            showChildDevices: false,
          },
        },
      },
    })
  ],
})
export class DeviceEnrolmentWidgetModule {}
