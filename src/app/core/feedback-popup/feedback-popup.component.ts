import { Component, ElementRef, OnInit,AfterViewInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { throws } from 'assert';
import { iScopeDetail, PopoutService } from 'src/app/services/popout.service';


@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.scss']
})
export class FeedbackPopupComponent implements OnInit,AfterViewInit {

  @ViewChild("popout",{static: true})popout!: ElementRef;
  public scopeDetails:iScopeDetail = {
    success: false, 
    scopeId: "NAN",
    actionStatus: "NAN"
  };
  public currentDate: any;
  public currentTime: any;
  public lock:boolean = false;

  public locked:boolean = false;

  constructor(private _popoutService : PopoutService ) { }
  ngAfterViewInit(): void {
    this._popoutService.scopeDetail.subscribe((data)=>{
      if(data){
        
        // this.message = data;
        if(data.success && !this.locked){
          this.locked = true;
          this.lock = true;
          this.scopeDetails = data;
          this.formatDate();
          this.display();
        }else{
          
        }
      }
    })
  }

  ngOnInit(): void {
   
  }
  
  private formatDate() {
    var today = new Date();
    var yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let ds;
    let ms;
    if (dd < 10) ds = '0' + dd;
    if (mm < 10) ms = '0' + mm;

    this.currentDate = dd + '/' + mm + '/' + yyyy;
    var h = (today.getHours()<10?'0':'') + today.getHours();
    var m = (today.getMinutes()<10?'0':'') + today.getMinutes();
    this.currentTime= h + ':' + m;
}

  public display():void {
    if(this.locked){
      // var ele = document.getElementById("feedback-popout") as HTMLElement;
      // console.log(" element is =",ele)
      this.popout.nativeElement.style.animation = "fadeIn 1s forwards";
      setTimeout(()=>{
        this.popout.nativeElement.style.animation = "fadeOut 1s";
        setTimeout(()=>{
          this.lock = false;
          this.locked = false;
        },1000)
      },3000)
    }
  }

  private show():void{

  }
}
