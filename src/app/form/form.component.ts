// Core imports
import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { FormGroup }                from '@angular/forms';

//import the file uploader plugin
import { FileUploader }             from 'ng2-file-upload/ng2-file-upload';

//Import models
import { BaseFields }               from './models/base-field.model';

// Services
import { FieldService }             from './services/field.service';
import { FieldControlService }      from './services/field-control.service';

// Constant data
const URL = 'http://localhost:4200';

// Component Decorator
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [FieldControlService]
})
export class FormComponent implements OnInit {
  @Input() fields: BaseFields<any>[] = [];

  form: FormGroup;
  payLoad: any = '';
  savedForm: any[] = [];

  /**
   * Declare a property called fileuploader and assign it to an instance of a new fileUploader.
   * Pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the 
   * file input when sending the post request.
   */
  public uploader:FileUploader = new FileUploader({url: URL + '/upload', itemAlias: 'photo'});

  constructor(private fieldsService: FieldControlService) {
    this.payLoad = '';
    this.savedForm = [];
  }

  /**
   * Handler to make initial setup for form
   */
  ngOnInit () {
    this.form = this.fieldsService.toFormGroup(this.fields);

    // Handler after file added
    this.uploader.onAfterAddingFile = (file) => {
      this.form.value['profile'] = file.file.name;
    };

    // Handler after file upload cmplete
	  this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
  
  /**
   * Updates form field value
   * @param value 
   */
  updateValue(value){
    this.form.controls[value.key].setValue(value.data);
  }

  /**
   * Handler to sublit dynamic form
   */
  onSubmit () {
    // Form Payload
    this.payLoad = this.form.value;
    this.savedForm.push(this.payLoad);

    // @TODO
    // Call api to save the form data
    // Then make the following api call to sublit file data

    // File Upload Service
    // if(this.uploader.getNotUploadedItems().length) {
    //   this.uploader.uploadAll();
    // }
  }
}
