import { Component } from '@angular/core';
import { FieldService } from './form/services/field.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:  [FieldService]
})
export class AppComponent {
  fields: any;
  title = 'Dynamic form Demo';

  /**
   * AppComponemt Constructor
   * @param  {object} service
   */
  constructor(FieldService: FieldService) {
    this.fields = FieldService.getFields();
  }
}
