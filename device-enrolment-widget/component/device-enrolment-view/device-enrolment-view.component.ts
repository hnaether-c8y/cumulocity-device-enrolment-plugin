import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from '@c8y/client';
import {
  ClipboardService,
} from '@c8y/ngx-components';
import { DeviceEnrolmentViewService } from './device-enrolment-view.service';


@Component({
  selector: 'c8y-device-enrolment-view',
  templateUrl: './device-enrolment-view.component.html',
})
export class DeviceEnrolmentViewComponent implements OnInit {
  @Input() config: any;
  isLoading = true;
  codeDevice : string = '';
  codeContainer : string = '';
  errorMessage: string = '';
  externalId: string = 'device0001';

  constructor(
    protected inventoryService: InventoryService,
    private assetPropertiesViewService: DeviceEnrolmentViewService,
    private clipboardService: ClipboardService,
  ) {}

  async ngOnInit(): Promise<void> {
  }

  async generateCode() {
    const data = await this.assetPropertiesViewService.getRegistrationCode(this.externalId);
    if (data['error']) {
      this.errorMessage = data['error'];
      this.codeDevice = '';
      this.codeContainer = '';
    } else {
      this.codeDevice = data['script'] || '';
      this.codeContainer = data['docker'] || '';
      this.errorMessage = '';
    }
  }

  copyIt(text) {
    this.clipboardService.writeText(text);
  }
}
