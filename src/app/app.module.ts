// Angular core Modules
import { NgModule }               from '@angular/core';
import { FormsModule,  }          from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule }          from '@angular/platform-browser';

// Third party angular Module
import { FileSelectDirective }    from 'ng2-file-upload';

// Services
import { FieldService }           from './form/services/field.service';
import { CalendarService }        from './datepicker/calendar.service';

// Components
import { AppComponent }           from './app.component';
import { FormComponent }          from './form/form.component';
import { FieldComponent }         from './form/field.component';
import { DatepickerComponent }    from './datepicker/datepicker.component';
import { MonthComponent }         from './datepicker/month/month.component';

// Module decorator
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DatepickerComponent,
    FieldComponent,
    FileSelectDirective,
    FormComponent,
    MonthComponent
  ],
  providers: [CalendarService, FieldService, ],
  bootstrap: [AppComponent]
})
export class AppModule {}
