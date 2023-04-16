import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Route
import { HomeRoutingModule } from './home-routing.module';

// Component
import { HomeComponent } from './home.component';
// import { PopoutComponent } from '../../core/popout/popout.component';

// Form
import{ ReactiveFormsModule }from '@angular/forms';
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { FeedbackPopupModule } from 'src/app/core/feedback-popup/feedback-popup.module';

// import { CustomDirectiveModule } from 'src/app/directives/custom-directive.module';


@NgModule({
  declarations: [
    HomeComponent,
    // PopoutComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        FeedbackPopupModule
    ]
})

export class HomeModule { }
