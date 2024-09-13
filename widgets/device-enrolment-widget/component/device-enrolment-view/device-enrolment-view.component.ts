import { Component, Input } from '@angular/core';
import { InventoryService } from '@c8y/client';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeviceEnrolmentModalComponent } from '../../../device-enrolment-modal/device-enrolment-modal.component';


@Component({
  selector: 'c8y-device-enrolment-view',
  templateUrl: './device-enrolment-view.component.html',
})
export class DeviceEnrolmentViewComponent {
  @Input() config: any;
  isLoading = true;

  constructor(
    protected inventoryService: InventoryService,
    private bsModalService: BsModalService
  ) {}

  openModal() {
    this.bsModalService.show(DeviceEnrolmentModalComponent, {
      backdrop: 'static',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title',
      class: 'lg'
    });
  }
}
