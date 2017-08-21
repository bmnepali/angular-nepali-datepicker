// Import Base Fields
import { BaseFields } from './base-field.model';

export class EmailField extends BaseFields <string> {
  controlType = 'email';
  type: string;

  constructor(options: {} = {}) {
    // Common fields
    super(options);

    //Other fields
    this.type = options['type'] || 'email';
  }
}
