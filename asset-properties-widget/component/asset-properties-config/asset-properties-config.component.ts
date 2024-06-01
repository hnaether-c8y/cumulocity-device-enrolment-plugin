import { Component, Input, OnChanges } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { IManagedObject, InventoryService } from '@c8y/client';
import { DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-asset-properties-config',
  templateUrl: './asset-properties-config.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AssetPropertiesConfigComponent implements DynamicComponent, OnBeforeSave, OnChanges {
  @Input() config: any = {};
  selectedAsset: IManagedObject;

  constructor(private inventoryService: InventoryService) {}

  async ngOnChanges() {
    if (this.config.device?.hasOwnProperty('c8y_IsDevice')) {
      this.selectedAsset = this.config.device;
      return;
    }
    try {
      this.selectedAsset = (await this.inventoryService.detail(this.config.device.id)).data;
    } catch (er) {
      // intended empty
    }
  }

  onBeforeSave(config: any): boolean {
    return !!(config.properties && config.properties.some(value => value.active === true));
  }
}
