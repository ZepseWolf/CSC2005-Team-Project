import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Route
import { CalendarRoutingModule } from './calendar-routing.module';

// Component
// import { PopoutComponent } from '../../core/popout/popout.component';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

// Form 
import{ ReactiveFormsModule }from '@angular/forms';
import { FeedbackPopupModule } from 'src/app/core/feedback-popup/feedback-popup.module';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,

])
@NgModule({
  declarations: [
    CalendarComponent,
    // PopoutComponent
  ],
  imports: [  
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    FeedbackPopupModule
  ]
})

export class CalendarModule { }
