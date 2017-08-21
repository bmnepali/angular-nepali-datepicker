// Import base field
import { BaseFields } from './base-field.model';

export class DropdownField extends BaseFields <string> {
  controlType = 'dropdown';
  selected = '';
  options: {
    key: string, value: string
  } [] = [];

  constructor(options: {} = {}) {
    // Common fields
    super(options);

    // Extra fields
    this.options = options['options'] || [];
    this.selected = options['selected'] || '';
  }
}
