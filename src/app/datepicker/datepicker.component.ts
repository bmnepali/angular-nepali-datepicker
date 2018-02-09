// Core imports
import { Component, OnInit, Input, ElementRef }  from '@angular/core';
import { FormGroup, FormControl }          from '@angular/forms';

// Services
import { CalendarService }    from './calendar.service';

// Component Decorator
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [CalendarService]
})
export class DatepickerComponent implements OnInit {
  @Input() field: any;
  @Input() form: FormGroup;
  @Input() value: string;

  // variable declerations
  fetchedYear: any;
  date: string;
  monthData = [];
  years = [];

  // Default date
  day = '9';
  month = "Ashwin";
  year = '2070';

  // Available Year range
  maxYear = '2072';
  minYear = '2070';

  // Months
  months = [
    "Baishakh", "Jestha","Ashadh","Shrawan","Bhadra","Ashwin",
    "Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"
  ];

  // Oject to hold selected date
  selectedDate = {
    day: '',
    month: '',
    year:''
  };

  // Additional flags
  isCalendarHidden = true;
  isLoading = true;

  /**
   * Datepicker Component Constructor
   * @param  {CalendarService} CalendarService
   */
  constructor(public CalendarService: CalendarService) {
    this.loadDropDowns();
  }

  ngOnInit () {
    if (this.value) {
      let selected:any = this.value.split(" ");
      let date:any = selected.toString().split(",");

      this.selectedDate.day = this.day = date[0];
      this.selectedDate.month = this.month = date[1];
      this.selectedDate.year = this.year = date[3];
    }
  }

  /**
   * Captures the payload sent form month component
   * Used to display the selected date
   * @param {string} message
   */
  onNotify(data:any[]) {
    this.date = data[0] + " " + data[1] + ", " + data[2];
    this.day = data[0];
    this.hideCalendar();
  }

  /**
   * Load the select options for year and months dropdowns
   */
  loadDropDowns() {
    for(let i = parseInt(this.minYear); i <= parseInt(this.maxYear); i++){
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
    this.isLoading = true;
    this.CalendarService.getCalendar("https://github.com/bmnepali/angular-nepali-datepicker/tree/master/data/" + year + ".json")
      .subscribe (
        (response) => {
          this.fetchedYear = response.json();
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

  	if(index < 11){
      this.month = this.months[++index];
  		this.loadData(this.months[index]);
  	} else {
  		if((parseInt(this.year) + 1) <= parseInt(this.maxYear)){
        this.year = (parseInt(this.year) + 1).toString();
        this.month = this.months[0];
  			this.fetchData(this.year);   		// Get data of next year
  		} else {
        console.log("Unavailable next year" + (parseInt(this.year)+1) + " max : " + this.maxYear);
      }
  	}
  }

  /**
   * Handler for previous button click in caledar
   */
  previousMonth () {
    let index = this.months.indexOf(this.month);

    if(index >= 1){
      this.month = this.months[--index];
  		this.loadData(this.months[index]);
  	} else {
  		if((parseInt(this.year) - 1) >= parseInt(this.minYear)){
        this.year = (parseInt(this.year) - 1).toString();
        this.month = this.months[11];
  			this.fetchData(this.year); // Get data of previous year
  		} else {
        console.log("Unavailable previous date");
      }
  	}
  }

  /**
   * Shows calendar datepicker
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
