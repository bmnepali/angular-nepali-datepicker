// Core Imports
import { Component, EventEmitter, Input, Output} from '@angular/core';

// Component Decorator
@Component({
  selector: 'app-month',
  templateUrl: './month.component.html'
})
export class MonthComponent {
  @Output() notify: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() monthData: any;
  @Input() selectedDate: any;
  @Input() month: string;
  @Input() year: string;
  @Input() day: string;

  /**
   * Create chuncks of array of given size
   * @param  {array} arr
   * @param  {number} chunkSize
   * @return {array}
   */
  chunk (arr, chunkSize) {
    let groups = [], i;

    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }

    return groups;
  }

  /**
   * Selects date and send to to the listener
   * @param  {object} date
   */
  selectDate (date) {
    this.notify.emit([date.np, this.month, this.year]);
  }
}
