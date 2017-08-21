// Import Base Fields
import { BaseFields } from './base-field.model';

export class FileField extends BaseFields <string> {
  controlType = 'file';
  type: string;

  constructor(options: {} = {}) {
    // Common fields
    super(options);

    // Other fields
    this.type = options['type'] || 'file';
  }
}
