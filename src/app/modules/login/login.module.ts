import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Route
import { LoginRoutingModule } from './login-routing.module';

// Component
import { LoginComponent } from './login.component';
// import { PopoutComponent } from '../../core/popout/popout.component';

// Form 
import{ ReactiveFormsModule }from '@angular/forms';
import { FeedbackPopupModule } from 'src/app/core/feedback-popup/feedback-popup.module';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    LoginComponent,
    // PopoutComponent
  ],
  imports: [  
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FeedbackPopupModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
  ]
})
export class LoginModule { }
