import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


// UI
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { PopoutModule } from './core/popout/popout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackPopupModule } from './core/feedback-popup/feedback-popup.module';
import { SideMenuComponent } from './core/side-menu/side-menu.component';
import { NavComponent } from './core/nav/nav.component';


import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NavComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      databaseURL: environment.databaseURL,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId
    })),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PopoutModule,
    FullCalendarModule,
    NgbModule,
    FeedbackPopupModule,
    RouterModule
    // SideMenuComponent
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
