import { NgModule } from '@angular/core';
import { DeviceEnrolmentModalComponent } from './device-enrolment-modal.component';
import { CoreModule } from '@c8y/ngx-components';

@NgModule({
  imports: [CoreModule],
  declarations: [DeviceEnrolmentModalComponent]
})
export class DeviceEnrolmentModalModule {}
