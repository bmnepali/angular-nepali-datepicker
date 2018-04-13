// Core imports
import { Injectable } from '@angular/core';

// Import models
import { BaseFields } from '../models/base-field.model';
import { DropdownField } from '../models/dropdown-field.model';
import { EmailField } from '../models/email-field.model';
import { FileField } from '../models/file-field.model';
import { TextField } from '../models/text-field.model';
import { DatepickerField } from '../models/datepicker-field.model';

@Injectable()
export class FieldService {

  /**
   * Returns the list of fields based on their respective order property
   * @return {array} List of fields
   */
  getFields () {
    const fields: any[] = [
      new DropdownField({
        key: 'dropdown',
        label: 'Dropdown',
        selected: 'option3',
        options: [
          {key: 'option1', value: 'Option One'},
          {key: 'option2', value: 'Option Two'},
          {key: 'option3', value: 'Option Three'},
          {key: 'option4', value: 'Option Four'}
        ],
        order: 3
      }),
      new TextField({
        key: 'fname',
        label: 'First Name',
        placeholder: 'Enter yout first name',
        value: 'Jone',
        required: true,
        order: 1
      }),
      new TextField({
        key: 'address',
        label: 'Permanent Address',
        placeholder: 'Your permanent address',
        order: 2
      }),
      new EmailField({
        key: 'email',
        label: 'Email',
        placeholder: 'example@gmail.com',
        required: true,
        order: 4
      }),
      new FileField({
        key: 'avatar',
        label: 'Profile Image',
        order: 5
      }),
      new DatepickerField({
        key: 'dob',
        label: 'Date of Birth',
        order: 2,
        placeholder: 'Day Month, Year',
        value: '9 Poush, 2072'
      }),
      new DatepickerField({
        key: 'registerDate',
        label: 'Registered Date',
        order: 4,
        placeholder: 'Day Month, Year',
        value: '4 Poush, 2072'
      })
    ];

    return fields.sort((fieldOne, fieldTwo) => fieldOne.order - fieldTwo.order);
  }
}
