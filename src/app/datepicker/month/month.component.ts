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

  weekDays: any[];

  // Consructor
  constructor() {
    this.weekDays = ['आइत','सोम','मगल','बुध','बिहि','शुक्र','शनि']
  }

  /**
   * Create chuncks of array of given size
   * @param  {Array} arr
   * @param  {Number} chunkSize
   * @return {Array}
   */
  weeklyChunk(arr, chunkSize) {
    let groups = [], i;

    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }

    return groups;
  }

  /**
   * Selects date and send to to the listener
   * @param  {Object} date
   */
  selectDate (date) {
    this.notify.emit([date.np, this.month, this.year]);
  }
}
