import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LifeCycleService } from 'src/app/services/life-cycle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,AfterViewInit {

  constructor(private _lifeCycleService:LifeCycleService) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this._lifeCycleService.initCheck();
    },1000)
    
  }
  ngOnInit(): void {
  }

}
