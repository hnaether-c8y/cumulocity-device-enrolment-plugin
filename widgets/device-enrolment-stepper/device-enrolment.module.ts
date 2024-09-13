import { NgModule } from '@angular/core';
import { CoreModule, hookDocs } from '@c8y/ngx-components';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeviceEnrolmentFactory } from './device-enrolment.factory';
import { DeviceEnrolmentModalModule } from '../device-enrolment-modal/device-enrolment-modal.module';

@NgModule({
  imports: [CoreModule, ModalModule, DeviceEnrolmentModalModule],
  providers: [hookDocs(DeviceEnrolmentFactory)]
})
export class DeviceEnrolmentModule {}