// Core imports
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';

// Import the file uploader plugin
import { FileUploader }      from 'ng2-file-upload/ng2-file-upload';

// Model Classes
import { BaseFields }        from './models/base-field.model';

@Component({
  selector: 'field',
  templateUrl: './field.component.html'
})
export class FieldComponent implements OnInit {
  @Input() field: BaseFields<any>;
  @Input() form: FormGroup;
  @Input() uploader: FileUploader;
  @Output() awesome = new EventEmitter<any>();

  /**
   * Handler to make initial setup for field
   */
  ngOnInit () {}

  /**
   * Updates fields value
   * @param data
   */
  update(data) {
    this.awesome.emit(data);
  }

  /**
   * Checks if the given field is valid or not
   * @return {boolean} Valid status
   */
  get isValid() {
    return this.form.controls[this.field.key].valid;
  }
}
