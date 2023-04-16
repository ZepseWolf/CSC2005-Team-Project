import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Dictionary } from '@fullcalendar/angular';
import { LifeCycleService } from 'src/app/services/life-cycle.service';
import { createEventId, getid } from './event-utils';
import { FeedbackPopupModule } from 'src/app/core/feedback-popup/feedback-popup.module';
import { PopoutService } from 'src/app/services/popout.service';
import { FireBaseService } from 'src/app/services/firebase.service';
import { render } from 'preact/compat';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit,AfterViewInit {
  constructor(private _lifeCycleService:LifeCycleService ,private _popoutService: PopoutService, private _firebaseService: FireBaseService) { 
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this._lifeCycleService.initCheck();
      // this._popoutService.setScopeDetail({success:true,scopeId:"6969" ,actionStatus: "calendar added"});
    },1000)
    
  }

  calendarOptions: CalendarOptions;
  calendarVisible = false;
  currentEvents: EventApi[] = [];
  
  ngOnInit(): void {
    setTimeout(()=>{
      this._getEvents();
      // To prevent lifecycle issue when lazy loaded (i believe).
    },1)
    // 
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    var events = calendarApi.getEvents();
    var count = 0;

    for (let index = 0; index < events.length; index++) {
      var e = events[index].start;
      if (e != null) {
        e.setDate(e.getDate()+1);
        if (e.toISOString().replace(/T.*$/, '') === selectInfo.startStr) {
          count++;
        }
      }
    }

    if (count >= 4 ) {
      alert('Maximum number of scopes scheduled today.');
    } else {
      const title = prompt('Enter/scan scope to be scheduled for sampling on ' + selectInfo.startStr);
      if (title) {
        //this._firebaseService.getAllScope().then((data)=>{
          // while(!this._firebaseService.gottenScopeData){}
          var data = this._firebaseService.databaseScope;
          var array = Object.keys(data);
          var scope;
          for (let index = 0; index < array.length; index++) {
            if (data[array[index]].id == title) {
              scope = data[array[index]];
              break;
            }
          }

          if (scope != undefined) {
            if (scope.samplingDate != "Null") {
              this._popoutService.setMessage("Scope already scheduled on " + scope.samplingDate);
              console.log(scope)
              calendarApi.unselect(); // clear date selection
            } else {
              scope.samplingDate = selectInfo.startStr;
              //this._firebaseService.updateScopeById(title, scope);
              this._firebaseService.updateScopeById(title, scope);
              console.log(scope);
              console.log("add start " + title)
              calendarApi.addEvent({
                id: createEventId(),
                title: "Scope "+title,
                start: selectInfo.startStr, 
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
              }); 
              console.log("add end " + title + " " + getid())
              this._popoutService.setScopeDetail({success:true,scopeId:"Scope "+title ,actionStatus: "Scope added to schedule."})
            }
          } else {
            this._popoutService.setMessage("Non existing scope ID found , please try again.");
          } 
          //}
        //)
      }
    }
    calendarApi.unselect(); // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      var id = clickInfo.event.title.slice(-6);
      //this._firebaseService.getAllScope().then((data)=>{
        // while (!this._firebaseService.gottenScopeData){}
        var data = this._firebaseService.databaseScope;
        var array = Object.keys(data);
        var scope;
        for (let index = 0; index < array.length; index++) {
          if (data[array[index]].id == id) {
            scope = data[array[index]];
            break;
          }
        }
        scope.samplingDate = "Null";
        console.log(scope);
        //this._firebaseService.updateScopeById(id, scope);
        this._firebaseService.updateScopeById(id, scope);
        clickInfo.event.remove();
        this._popoutService.setScopeDetail({success:true,scopeId:id ,actionStatus: "Scope removed from schedule."})
      //  }
      //)
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  generate():void{
    var ele = document.createElement
  }

  _getEvents(): void {
    var temp: any[] = [];
    // while(!this._firebaseService.gottenScopeData){}
    //this._firebaseService.getAllScope().then((data)=>{
      
      var data = this._firebaseService.databaseScope;
      var array = Object.keys(data);
        for (let index = 0; index < array.length; index++) {
          var scope = data[array[index]];
          if (scope.samplingDate != "Null") {
            temp.push(this.newEventEntry(Number(scope.id), scope.samplingDate))
          }
        }

      this.calendarOptions = {
        themeSystem: 'standard',
        headerToolbar: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        initialView: 'dayGridMonth',
        initialDate: "2022-01-01",
        events: temp, // alternatively, use the `events` setting to fetch from a feed
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
      };  

      this.calendarVisible =true;
      
    //});
  }

  newEventEntry(id:number, date:string): Dictionary {
    return {"title": "Scope " + String(id), "start": date}
  }
}
