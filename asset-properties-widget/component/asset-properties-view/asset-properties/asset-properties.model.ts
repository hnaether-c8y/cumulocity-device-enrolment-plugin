import { IManagedObjectBinary } from '@c8y/client';
import { JSONSchema7 } from 'json-schema';

export interface AssetPropertiesItem {
  key: string;
  value: any;
  label: string;
  type: string;
  description?: string;
  complex?: AssetPropertiesItem[];
  file?: IManagedObjectBinary;
  isEdit: boolean;
  jsonSchema?: JSONSchema7;
  lastUpdated: string;
  isEditable: boolean;
  active: boolean;
  isStandardProperty: boolean;
}
