// Core imports
import { Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Services
import { CalendarService } from './calendar.service';

// Component Decorator
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [CalendarService]
})
export class DatepickerComponent implements OnInit {
  @ViewChild('eRef') eRef: ElementRef;
  @ViewChild('calendar') calendar: ElementRef;

  @Input() form: FormGroup;
  @Input() field: any;
  @Input() id: string;
  @Input() value: string;

  @Output() callback = new EventEmitter<any>();

  // variable declerations
  fetchedYear: any;
  date: string;
  monthData: any[];
  years: any[];

  // Default date
  day: string;
  month: string;
  year: string;

  // Available Year range
  maxYear: string;
  minYear: string;

  // Months
  months: string[];

  // Holds selected date
  selectedDate: any;

  // Additional flags
  isCalendarHidden: boolean;
  isLoading: boolean;

  // Dicument click handler
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef && this.eRef.nativeElement.contains(event.target)) {
      this.showCalendar();
    } else {
      if (this.calendar) {
        this.hideCalendar();
      }
    }
  }

  /**
   * Datepicker Component Constructor
   * @param  {CalendarService} CalendarService
   */
  constructor(public CalendarService: CalendarService) {
    this.monthData = [];
    this.years = [];

    this.day = '9';
    this.month = 'Ashwin';
    this.year = '2070';

    this.maxYear = '2072';
    this.minYear = '2070';

    this.months = [
      'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
      'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
    ];

    this.selectedDate = {
      day: '',
      month: '',
      year: ''
    };

    this.isCalendarHidden = true;
    this.isLoading = true;

    // Loads dropdowns  of years
    this.loadDropDowns();
  }

  // On Component Initialiazation
  ngOnInit () {
    if (this.value) {
      const selected: any = this.value.split(' ');
      const date: any = selected.toString().split(',');

      this.selectedDate.day = this.day = date[0];
      this.selectedDate.month = this.month = date[1];
      this.selectedDate.year = this.year = date[3];
    }
  }

  /**
   * Updates datepicker value
   * @param data
   */
  callParent(data) {
    this.callback.emit({
      key: this.id,
      data: data
    });
  }

  /**
   * Captures the payload sent form month component
   * Used to display the selected date
   * @param {string} message
   */
  onNotify(data: any[]) {
    this.date = data[0] + ' ' + data[1] + ', ' + data[2];
    this.day = data[0];
    this.callParent(this.date);
    this.hideCalendar();
  }

  /**
   * Load the select options for year and months dropdowns
   */
  loadDropDowns() {
    for (let i = parseInt(this.minYear); i <= parseInt(this.maxYear); i++){
  		this.years.push(i);
  	}
  }

  /**
   * Populates the month data in the calendar month view
   * @param  {string} month
   */
  loadData(month){
    this.monthData = this.fetchedYear[month];
  }

  /**
   * Get the year's data  and populate the data to the calander
   */
  fetchData(year) {
    const dataUrl = 'https://raw.githubusercontent.com/bmnepali/angular-nepali-datepicker/master/data/' + year + '.json';

    this.isLoading = true;
    this.CalendarService.getCalendar(dataUrl)
      .subscribe (
        (response) => {
          this.fetchedYear = response;
          this.loadData(this.month);
          this.isLoading = false;
        },
        (error) => console.log(error)
      );
  }

  /**
   * Handler for next button click in caledar
   */
  nextMonth () {
    let index = this.months.indexOf(this.month);

  	if (index < 11){
      this.month = this.months[++index];
  		this.loadData(this.months[index]);
  	} else {
  		if ((parseInt(this.year) + 1) <= parseInt(this.maxYear)){
        this.year = (parseInt(this.year) + 1).toString();
        this.month = this.months[0];
  			this.fetchData(this.year);
  		} else {
        console.log('Unavailable next year' + (parseInt(this.year) + 1) + ' max : ' + this.maxYear);
      }
  	}
  }

  /**
   * Handler for previous button click in caledar
   */
  previousMonth () {
    let index = this.months.indexOf(this.month);

    if (index >= 1){
      this.month = this.months[--index];
  		this.loadData(this.months[index]);
  	} else {
  		if ((parseInt(this.year) - 1) >= parseInt(this.minYear)){
        this.year = (parseInt(this.year) - 1).toString();
        this.month = this.months[11];
  			this.fetchData(this.year);
  		} else {
        console.log('Unavailable previous date');
      }
  	}
  }

  /**
   * Shows datepicker calendar
   */
  showCalendar() {
    this.isCalendarHidden = false;
    return this.fetchData(this.year);
  }

  /**
   * Hides the calendar datepicker
   */
  hideCalendar() {
    this.isCalendarHidden = true;
  }

  /**
   * Loads the year's data form server on year change
   * @param  {string} year
   * @return {object}
   */
  onYearChange(year) {
    this.fetchData(year);
  }

  /**
   * Loads the month data form server on month change
   * @param  {string} month
   * @return {object}
   */
  onMonthChange(month) {
    return this.loadData(month);
  }
}
