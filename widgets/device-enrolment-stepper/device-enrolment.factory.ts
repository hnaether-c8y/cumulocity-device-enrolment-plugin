import { Injectable } from '@angular/core';
import { DocLink, ExtensionFactory, gettext } from '@c8y/ngx-components';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

@Injectable()
export class DeviceEnrolmentFactory implements ExtensionFactory<DocLink> {
  constructor(private bsModalService: BsModalService) {}
  get() {
      return of([
        {
          icon: 'c8y-icon c8y-icon-mobile-add',
          type: 'quicklink',
          label: gettext('Device enrolment'),
          url: undefined,
          click: async () => {
            const { DeviceEnrolmentModalComponent } = await import(
              '../device-enrolment-modal/device-enrolment-modal.component'
            );
            this.bsModalService.show(DeviceEnrolmentModalComponent, {
              backdrop: 'static',
              ariaDescribedby: 'modal-body',
              ariaLabelledBy: 'modal-title',
              class: 'lg'
            });
          }
        } as DocLink
      ]);
    }
}
