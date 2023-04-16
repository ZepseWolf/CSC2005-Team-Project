import { AfterViewInit, Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FeedbackPopupModule } from 'src/app/core/feedback-popup/feedback-popup.module';
import { FireBaseService } from 'src/app/services/firebase.service';
import { LifeCycleService } from 'src/app/services/life-cycle.service';
import { PopoutService } from 'src/app/services/popout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit,AfterViewInit {
  
  flag:number = 0;
  constructor(private modalService: NgbModal,private _popoutService:PopoutService,private _lifeCycleService:LifeCycleService, private _fireBaseService: FireBaseService) {}

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this._lifeCycleService.initCheck();
    },1000)
    
  }
  ngOnInit(): void {
    
  }

  public handleToggle():void {
    var element = document.getElementById('myDropdown');
    if (element != undefined && this.flag == 0) {
      element.style.visibility = "visible";
      this.flag = 1;
    } else {
      if (element != undefined) {
        this.flag = 0;
        element.style.visibility =  "hidden";
      }

    }
  }

  public showInstruction(event:any,toShow :boolean){
    if(toShow){
      event.target.parentElement.children[0].classList.remove("hide");
    }else{
      event.target.parentElement.children[0].classList.add("hide");
    }
  }

  closeResult = '';
  currentCheckOutScope: string ;
  currentCheckInScope : string ;

  open(content: any) {
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result;
  }

  public successCheckout():void{
    if(this._fireBaseService.gottenScopeData){
      if(this._fireBaseService.databaseScope[this.currentCheckOutScope] !== undefined){
        if(this._fireBaseService.databaseScope[this.currentCheckOutScope].inShelf){
          this._fireBaseService.databaseScope[this.currentCheckOutScope].inShelf = false;
          this._popoutService.setScopeDetail({success: true ,scopeState:this.currentStatus, scopeId:this.currentCheckOutScope, actionStatus: "Check-out"});
          this._fireBaseService.setScope(this._fireBaseService.databaseScope);
          // Update database here
          this._fireBaseService.updateScopeById(this.currentCheckOutScope,this._fireBaseService.databaseScope[this.currentCheckOutScope]);
        }else{
          this._popoutService.setMessage("Scope had already been checked out.");
        }
      }else{
        this._popoutService.setMessage("Non existing scope ID found , please try again.");
      }
    }else{
      this._popoutService.setMessage("Failed to find data, please try again.");
    }
  }

  public successCheckIn():void{
    if(this._fireBaseService.gottenScopeData){
      if(this._fireBaseService.databaseScope[this.currentCheckInScope] !== undefined){
        if(!this._fireBaseService.databaseScope[this.currentCheckInScope].inShelf){
          this._fireBaseService.databaseScope[this.currentCheckInScope].inShelf = true;
          this._popoutService.setScopeDetail({success: true ,scopeId:this.currentCheckInScope, actionStatus: "Check-in"})
          this._fireBaseService.setScope(this._fireBaseService.databaseScope);
          // Update database here
          this._fireBaseService.updateScopeById(this.currentCheckInScope,this._fireBaseService.databaseScope[this.currentCheckInScope])
        }else{
          this._popoutService.setMessage("Scope had already been checked in.");
        }
      }else{
        this._popoutService.setMessage("Non existing scope ID found , please try again.");
      }
    }else{
      this._popoutService.setMessage("Failed to find data, please try again.");
    }
    // this._popoutService.setScopeDetail({success: true ,scopeId:this.currentCheckInScope, actionStatus: "Check-in"})
  }


  submitForm(event: any , status: string) {
    if(status === 'checkout'){
      this.currentCheckOutScope = event.target.value;
    }
    else{
      this.currentCheckInScope = event.target.value;
    }
  }
  currentStatus:string;
  
  selectCurrentStatus(s:string){
    this.currentStatus = s;
  }
}
