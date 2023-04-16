import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackPopupComponent } from './feedback-popup.component';



@NgModule({
  declarations: [
    FeedbackPopupComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    FeedbackPopupComponent
  ]
})
export class FeedbackPopupModule { }
