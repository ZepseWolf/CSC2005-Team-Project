import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnimationService } from './services/animation.service';
import { FireBaseService } from './services/firebase.service';
import { LifeCycleService } from './services/life-cycle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  stateReady:boolean = false;
  subscription: Subscription| undefined;
  constructor(
    public _router: Router,
    private _lifeCycleService: LifeCycleService,
    private _animationService: AnimationService,
    private _fireBaseService :FireBaseService
  ) {
    
    //init once changed page
    this._router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        if(event.id !== 1){
          this._animationService.closeCurtain();
        }
        this._lifeCycleService.checkLoadedPages(event.url);
      }
      // if(event instanceof NavigationEnd) {
      //   console.log("The event is : " ,event);
      // }

      // if(event instanceof NavigationCancel){
      // }
    });
  }
}
