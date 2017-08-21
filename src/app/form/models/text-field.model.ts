// Import Base Fields
import { BaseFields } from './base-field.model';

export class TextField extends BaseFields <string> {
  controlType = 'text';
  type: string;

  constructor(options: {} = {}) {
    // Common Fields
    super(options);

    // Other Fields
    this.type = options['type'] || '';
  }
}
