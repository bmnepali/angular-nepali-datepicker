// COre Imports
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CalendarService {
  // Resolve HTTP using the constructor
  constructor (public http: Http) {}

  // private instance variable to hold base url
  getCalendar(commentsUrl) {
    return this.http.get(commentsUrl);
  }
}
