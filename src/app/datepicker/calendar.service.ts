// COre Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CalendarService {
  // Resolve HTTP using the constructor
  constructor (public http: HttpClient) {}

  // private instance variable to hold base url
  getCalendar(commentsUrl) {
    return this.http.get(commentsUrl);
  }
}
