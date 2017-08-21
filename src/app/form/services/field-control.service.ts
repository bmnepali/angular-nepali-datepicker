import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFields } from '../models/base-field.model';

@Injectable()
export class FieldControlService {

  /**
   * Create form onject for every field
   * @param  {array}  fields
   * @return {object}
   */
  toFormGroup(fields: BaseFields <any> [] ) {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required) : new FormControl(field.value || '');
    });

    return new FormGroup(group);
  }
}
