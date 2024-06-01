import { NgModule } from '@angular/core';
import {
  CoreModule,
  HOOK_COMPONENTS,
} from '@c8y/ngx-components';
import * as preview from './common/preview';
import { DeviceEnrolmentViewComponent } from './component/device-enrolment-view/device-enrolment-view.component'
import { DeviceEnrolmentViewService } from './component/device-enrolment-view/device-enrolment-view.service';

@NgModule({
  declarations: [
    DeviceEnrolmentViewComponent,
  ],
  imports: [
    CoreModule,
  ],
  providers: [
    DeviceEnrolmentViewService,
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
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
      },
    },
  ],
})
export class DeviceEnrolmentWidgetModule {}
