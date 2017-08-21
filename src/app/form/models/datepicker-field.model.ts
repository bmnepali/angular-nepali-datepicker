// Import Base Fields
import { BaseFields } from './base-field.model';

export class DatepickerField extends BaseFields <string> {
  controlType = 'datepicker';
  type: string;

  constructor(options: {} = {}) {
    // Commin fields
    super(options);

    // Extra fields
    this.type = options['type'] || '';
  }
}
