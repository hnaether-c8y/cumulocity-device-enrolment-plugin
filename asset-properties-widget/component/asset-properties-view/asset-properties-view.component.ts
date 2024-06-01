import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from '@c8y/client';
import {
  ClipboardService,
} from '@c8y/ngx-components';
import { AssetPropertiesViewService } from './asset-properties-view.service';


@Component({
  selector: 'c8y-asset-properties-view',
  templateUrl: './asset-properties-view.component.html',
})
export class AssetPropertiesViewComponent implements OnInit {
  @Input() config: any;
  isLoading = true;
  codeDevice : string = '';
  codeContainer : string = '';
  errorMessage: string = '';
  externalId: string = 'device0001';

  constructor(
    protected inventoryService: InventoryService,
    private assetPropertiesViewService: AssetPropertiesViewService,
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
