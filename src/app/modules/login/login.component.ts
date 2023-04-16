import { Component, OnInit ,AfterViewInit } from '@angular/core';
import { Observable , Subscription } from 'rxjs';

import { FormControl, FormGroup , Validators } from '@angular/forms';

//Service
import { LifeCycleService } from 'src/app/services/life-cycle.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { PopoutService } from 'src/app/services/popout.service';
import { FireBaseService } from 'src/app/services/firebase.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,AfterViewInit {
  inputValue:string ="";
  buttonDisabled:boolean = true;

  constructor(
    private _httpService : HttpService,
    private _router: Router,
    private _lifeCycleService: LifeCycleService,
    private _popoutService : PopoutService,
    private _firebaseService: FireBaseService
    ) {  }
  
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this._lifeCycleService.initCheck();
    },1000)
    
  }

  ngOnInit(): void {
    //console.log(this._firebaseService.dummyScope);
    // this._firebaseService.createNew().then((data)=>{
    //   console.log("this is da collection :",data);
    // })
    // this._firebaseService.getAllScope();
    // this._firebaseService.resetDatabase();
    // this._firebaseService.updateScopeById("test3", {
    //   "id": "953622",
    // "samplingDate": "2022-04-10",
    // "status": "REGULAR",
    // "brand": "OLYMPUS",
    // "modelNo": "BR134097Z",
    // "history": [
    //     {
    //         "dateOfCollection": "2021-01-09",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Reema House",
    //         "circulatedBy": "Clarke Mcintosh",
    //         "disinfectantUsed": "MAMALEMON5368Z",
    //         "disinfectantLotNo": "3160114",
    //         "disinfectantChanged": "2020-12-31",
    //         "detergentUsed": "BSRSDZ9584FR",
    //         "detergentLotNo": "5077450",
    //         "dateFilterChanged": "2021-01-06",
    //         "dateOfResult": "2021-01-09",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-02-19",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Beck Russo",
    //         "circulatedBy": "Zakk Hilton",
    //         "disinfectantUsed": "MAMALEMON7896Z",
    //         "disinfectantLotNo": "6980101",
    //         "disinfectantChanged": "2021-02-12",
    //         "detergentUsed": "BSRSDZ6861FR",
    //         "detergentLotNo": "5825671",
    //         "dateFilterChanged": "2021-02-18",
    //         "dateOfResult": "2021-02-19",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-03-05",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Zakk Hilton",
    //         "circulatedBy": "Clarke Mcintosh",
    //         "disinfectantUsed": "MAMALEMON9482Z",
    //         "disinfectantLotNo": "2315868",
    //         "disinfectantChanged": "2021-03-03",
    //         "detergentUsed": "BSRSDZ7387FR",
    //         "detergentLotNo": "5772363",
    //         "dateFilterChanged": "2021-03-01",
    //         "dateOfResult": "2021-03-05",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-04-08",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Rudra Flores",
    //         "circulatedBy": "Beck Russo",
    //         "disinfectantUsed": "MAMALEMON9764Z",
    //         "disinfectantLotNo": "7550293",
    //         "disinfectantChanged": "2021-03-27",
    //         "detergentUsed": "BSRSDZ8677FR",
    //         "detergentLotNo": "5526672",
    //         "dateFilterChanged": "2021-04-06",
    //         "dateOfResult": "2021-04-08",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-05-22",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Beck Russo",
    //         "circulatedBy": "Sean Pace",
    //         "disinfectantUsed": "MAMALEMON4112Z",
    //         "disinfectantLotNo": "2702726",
    //         "disinfectantChanged": "2021-05-20",
    //         "detergentUsed": "BSRSDZ6495FR",
    //         "detergentLotNo": "7686147",
    //         "dateFilterChanged": "2021-05-18",
    //         "dateOfResult": "2021-05-22",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-06-17",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Reema House",
    //         "circulatedBy": "Sean Pace",
    //         "disinfectantUsed": "MAMALEMON8461Z",
    //         "disinfectantLotNo": "7378940",
    //         "disinfectantChanged": "2021-06-11",
    //         "detergentUsed": "BSRSDZ9144FR",
    //         "detergentLotNo": "9586826",
    //         "dateFilterChanged": "2021-06-15",
    //         "dateOfResult": "2021-06-17",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-07-27",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Afsana Logan",
    //         "circulatedBy": "Sean Pace",
    //         "disinfectantUsed": "MAMALEMON5677Z",
    //         "disinfectantLotNo": "1839072",
    //         "disinfectantChanged": "2021-07-17",
    //         "detergentUsed": "BSRSDZ6298FR",
    //         "detergentLotNo": "5756857",
    //         "dateFilterChanged": "2021-07-23",
    //         "dateOfResult": "2021-07-27",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-08-28",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Sean Pace",
    //         "circulatedBy": "Zakk Hilton",
    //         "disinfectantUsed": "MAMALEMON4188Z",
    //         "disinfectantLotNo": "9659205",
    //         "disinfectantChanged": "2021-08-23",
    //         "detergentUsed": "BSRSDZ4085FR",
    //         "detergentLotNo": "3059528",
    //         "dateFilterChanged": "2021-08-24",
    //         "dateOfResult": "2021-08-28",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-09-08",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Clarke Mcintosh",
    //         "circulatedBy": "Beck Russo",
    //         "disinfectantUsed": "MAMALEMON6325Z",
    //         "disinfectantLotNo": "9157966",
    //         "disinfectantChanged": "2021-09-07",
    //         "detergentUsed": "BSRSDZ1648FR",
    //         "detergentLotNo": "7010509",
    //         "dateFilterChanged": "2021-09-06",
    //         "dateOfResult": "2021-09-08",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-10-23",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Afsana Logan",
    //         "circulatedBy": "Rudra Flores",
    //         "disinfectantUsed": "MAMALEMON9889Z",
    //         "disinfectantLotNo": "8349769",
    //         "disinfectantChanged": "2021-10-16",
    //         "detergentUsed": "BSRSDZ6737FR",
    //         "detergentLotNo": "9605413",
    //         "dateFilterChanged": "2021-10-19",
    //         "dateOfResult": "2021-10-23",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-11-06",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Muneeb Booth",
    //         "circulatedBy": "Afsana Logan",
    //         "disinfectantUsed": "MAMALEMON2943Z",
    //         "disinfectantLotNo": "8499017",
    //         "disinfectantChanged": "2021-10-24",
    //         "detergentUsed": "BSRSDZ7588FR",
    //         "detergentLotNo": "4952507",
    //         "dateFilterChanged": "2021-11-04",
    //         "dateOfResult": "2021-11-06",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     },
    //     {
    //         "dateOfCollection": "2021-12-14",
    //         "accessionNo": "AER156843FR3454Z",
    //         "aerModel": "NEWAERMACHINE",
    //         "aerSerial": "9471684714",
    //         "collectedBy": "Kelsie Forrest",
    //         "circulatedBy": "Rudra Flores",
    //         "disinfectantUsed": "MAMALEMON3881Z",
    //         "disinfectantLotNo": "5060258",
    //         "disinfectantChanged": "2021-12-11",
    //         "detergentUsed": "BSRSDZ6318FR",
    //         "detergentLotNo": "6381745",
    //         "dateFilterChanged": "2021-12-13",
    //         "dateOfResult": "2021-12-14",
    //         "fluidResult": "CLEAR",
    //         "fluidAnalysis": "NIL",
    //         "fluidActions": "NIL",
    //         "quaratine": false,
    //         "repeatDate": "NIL",
    //         "remarks": "NIL"
    //     }
    // ]});
    // this._firebaseService.getScopeById("100859").then((data)=>{
    //   console.log(data);
    // });
  }

  public focusInput():void{
    let ele = document.getElementById("idCard") as any;
    ele?.closest('.float-label-field').classList.add('focus');
    ele?.closest('.float-label-field').classList.add('float');
    this.checkCorrectId();
  }
  
  public blurInput(event: any):void{
    // When leave input
    // event.target?.closest('.float-label-field').classList.remove('focus');
    
    console.log(" this isn input value",this.inputValue != "");
    if (this.inputValue == "") {
      event.target?.closest('.float-label-field').classList.remove('correct');
      event.target?.closest('.float-label-field').classList.remove('incorrect');
      event.target?.closest('.float-label-field').classList.remove('float');
    }
  }

  public addFocus(event: any):void{
    event?.closest('.float-label-field').classList.add('float');
  }

  public autoFill():void{
    this.inputValue = "1849224";
    this.checkCorrectId();
    this.focusInput();
    // ele?.value =
  }

  public checkCorrectId():void{
    let ele = document.getElementById("idCard") as HTMLInputElement;
    if(this.inputValue == "1849224"){
      this.buttonDisabled= false;
      ele?.closest('.float-label-field')?.classList.add('correct');
      ele?.closest('.float-label-field')?.classList.remove('incorrect');
    }
    else{
      this.buttonDisabled= true;
      ele?.closest('.float-label-field')?.classList.add('incorrect');
      ele?.closest('.float-label-field')?.classList.remove('correct');
    }
  }

  public changeInput(event:any):void{
    console.log(event.target.value);
    this.inputValue = event.target.value;
    this.checkCorrectId();
  }

  public showInstruction(event:any,toShow :boolean){
    if(toShow){
      console.log("showing");
      event.target.parentElement.children[0].classList.remove("hide");
    }else{
      console.log("close showing");
      event.target.parentElement.children[0].classList.add("hide");
    }
  }
}