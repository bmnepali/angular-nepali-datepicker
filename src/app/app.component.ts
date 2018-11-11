import { Component } from '@angular/core';
import { FieldService } from './form/services/field.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:  [FieldService]
})
export class AppComponent {
  fields: any;
  title: string;

  /**
   * AppComponemt Constructor
   * @param  {object} service
   */
  constructor(FieldService: FieldService) {
    this.title = 'Dynamic form Demo';
    this.fields = FieldService.getFields();
  }
}
