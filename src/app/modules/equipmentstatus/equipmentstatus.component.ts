import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LifeCycleService } from 'src/app/services/life-cycle.service';
import { PopoutService } from 'src/app/services/popout.service';
import { FireBaseService } from 'src/app/services/firebase.service';

 
var arrOfNum: any;

@Component({
  selector: 'app-equipmentstatus',
  templateUrl: './equipmentstatus.component.html',
  styleUrls: ['./equipmentstatus.component.scss']
})

export class EquipmentstatusComponent implements OnInit,AfterViewInit {

  constructor(private _lifeCycleService:LifeCycleService, private _firebaseService: FireBaseService) { 
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this._lifeCycleService.initCheck();
    },1000)
    
  }
  ngOnInit(): void {
    while(!this._firebaseService.gottenScopeData){
      console.log(this._firebaseService.gottenScopeData)
      const sleep = ms => new Promise(r => setTimeout(r, ms));
    }
    // this._firebaseService.getAllScope().then((data)=> {
      var data = this._firebaseService.dummyScope;
      var array = Object.keys(data);
      arrOfNum = array;
      
    console.log(data)

      for (let index = 0; index < array.length; index++) {
        var scope = this._firebaseService.dummyScope[array[index]];
        var scopeTable = document.getElementById("scopeTable")!;
        var row = document.createElement("div");
        row.style.display = "grid";
        row.style.border = "1px black solid";
        row.style.paddingTop = "10px";
        row.style.paddingBottom = "10px";
        row.style.gridTemplateColumns = "repeat(5, minmax(0, 2fr))";
        row.style.backgroundColor = "#ededed";
        row.style.textAlign = "center";
        row.style.gridGap = "10px";
  
        row.className = "iwasforcedtobyJingQuan"
        var row_ID = document.createElement("div");
        row_ID.innerHTML =  scope.id;
  
        var row_brand = document.createElement("div");
        row_brand.innerHTML = scope.brand;
  
        var row_model = document.createElement("div");
        row_model.innerHTML = scope.modelNo;
  
        var row_type = document.createElement("div");
        row_type.innerHTML = "Special";
  
        var row_serial = document.createElement("div");
        row_serial.innerHTML = scope.modelNo;
  
        var row_source = document.createElement("div");
        row_source.innerHTML = scope.status;
  
        var row_location = document.createElement("div");
        row_location.innerHTML = scope.inShelf ? "In Shelf" : "In Use";
  
  
        row.appendChild(row_ID);
        row.appendChild(row_brand);
        //row.appendChild(row_model);
        //row.appendChild(row_type);
        row.appendChild(row_serial);
        row.appendChild(row_source);
        row.appendChild(row_location);
  
  
        row.addEventListener("click", event => {
          this.popUp(scope.id);
        })  
  
  
        scopeTable.appendChild(row);
      }
    // });
  }

  public popUp(scopeId : any){
    var data = this._firebaseService.dummyScope;
    var table = document.getElementById("popup")!;
    var tableContent = document.getElementById("tablepopup")!;
    var tableContentSampleDate = document.getElementById("nextSamplingDate")!;

    if (table.style.display == "none"){
      table.style.display = "block";
      

      tableContentSampleDate.innerHTML = data[scopeId].samplingDate;

      while (tableContent.childElementCount != 20){
        tableContent.removeChild(tableContent.lastChild!);
      }

      for (var i = 0; i < data[scopeId].history.length; i++){

        var row_ID = document.createElement("div");
        row_ID.innerHTML =  i.toString();

        var row_accessionNo = document.createElement("div");
        row_accessionNo.innerHTML =  data[scopeId].history[i].accessionNo;

        var row_aerModel = document.createElement("div");
        row_aerModel.innerHTML = data[scopeId].history[i].aerModel;

        var row_aerSerial = document.createElement("div");
        row_aerSerial.innerHTML = data[scopeId].history[i].aerSerial;

        var row_circulatedBy = document.createElement("div");
        row_circulatedBy.innerHTML = data[scopeId].history[i].circulatedBy;

        var row_collectedBy = document.createElement("div");
        row_collectedBy.innerHTML = data[scopeId].history[i].collectedBy;

        var row_dateFilterChanged = document.createElement("div");
        row_dateFilterChanged.innerHTML = data[scopeId].history[i].dateFilterChanged;

        var row_dateOfCollection = document.createElement("div");
        row_dateOfCollection.innerHTML = data[scopeId].history[i].dateOfCollection;

        var row_dateOfResult = document.createElement("div");
        row_dateOfResult.innerHTML = data[scopeId].history[i].dateOfResult;

        var row_detergentLotNo = document.createElement("div");
        row_detergentLotNo.innerHTML = data[scopeId].history[i].detergentLotNo;

        var row_detergentUsed = document.createElement("div");
        row_detergentUsed.innerHTML = data[scopeId].history[i].detergentUsed;

        var row_disinfectantChanged = document.createElement("div");
        row_disinfectantChanged.innerHTML = data[scopeId].history[i].disinfectantChanged;

        var row_disinfectantLotNo= document.createElement("div");
        row_disinfectantLotNo.innerHTML = data[scopeId].history[i].disinfectantLotNo;

        var row_disinfectantUsed= document.createElement("div");
        row_disinfectantUsed.innerHTML = data[scopeId].history[i].disinfectantUsed;

        var row_fluidActions= document.createElement("div");
        row_fluidActions.innerHTML = data[scopeId].history[i].fluidActions;

        var row_fluidAnalysis= document.createElement("div");
        row_fluidAnalysis.innerHTML = data[scopeId].history[i].fluidAnalysis;

        var row_fluidResult= document.createElement("div");
        row_fluidResult.innerHTML = data[scopeId].history[i].fluidResult;

        var row_quaratine= document.createElement("div");
        row_quaratine.innerHTML = data[scopeId].history[i].quaratine.toString();

        var row_remarks= document.createElement("div");
        row_remarks.innerHTML = data[scopeId].history[i].remarks;

        var row_repeatDate= document.createElement("div");
        row_repeatDate.innerHTML = data[scopeId].history[i].repeatDate;

        tableContent.append(row_ID);
        tableContent.append(row_accessionNo);
        tableContent.append(row_aerModel);
        tableContent.append(row_aerSerial);
        tableContent.append(row_circulatedBy);
        tableContent.append(row_collectedBy);

        tableContent.append(row_dateFilterChanged);
        tableContent.append(row_dateOfCollection);

        tableContent.append(row_dateOfResult);
        tableContent.append(row_detergentLotNo);
        tableContent.append(row_detergentUsed);
        tableContent.append(row_disinfectantChanged);
        tableContent.append(row_disinfectantLotNo);

        tableContent.append(row_disinfectantUsed);
        tableContent.append(row_fluidActions);
        tableContent.append(row_fluidAnalysis);
        tableContent.append(row_fluidResult);
        tableContent.append(row_quaratine);
        tableContent.append(row_remarks);
        tableContent.append(row_repeatDate);
        
      }
    }
    else{
      table.style.display = "none"
    }
  }

  public closeButton(){
    var table = document.getElementById("popup")!;
    if (table.style.display == "none"){
      table.style.display = "block";
    }else{
      table.style.display = "none";
    }
  }
  public dropBoxSearch(event:any){
    //console.log(Object.keys(jsonScope))
    //console.log(event.value)
    
    var userInput =(<HTMLInputElement>document.getElementById('userInput'))!;
    var displayUserInput = document.getElementById("displayResults")!;
    
    var br = document.createElement("span");
    br.innerHTML = "<br/>";

    var keys = Object.keys(arrOfNum);
    var counter = 0;

    
    

    userInput.onkeyup = function() {
      //console.log(userInput.value);
      var result = document.createElement('p'); // is a node
      if (userInput.value == ""){
        displayUserInput.style.display = "none"
      }else{
        displayUserInput.style.display = "block"
      }

      while (displayUserInput.firstChild) {
        displayUserInput.removeChild(displayUserInput.lastChild!);
      }
      keys.forEach(function(key){
        //console.log(typeof jsonScope[key]);
        var result = document.createElement('p');
        result.style.width = "100%";
        result.style.padding = "10px";

        result.addEventListener("mouseover", event => {
          result.style.backgroundColor = "#a3a3a3";
        })  
        result.addEventListener("mouseout", event => {
          result.style.backgroundColor = "";
        }) 

        if (arrOfNum[key].toString().includes(userInput.value) && counter < 10){
          //console.log(jsonScope[key])
          
          result.innerHTML =  "Scope No: " + arrOfNum[key] + " " + "<span style='font-family:Arial, FontAwesome'> &#xf0f1;</span>";
          displayUserInput.appendChild(result);
          displayUserInput.appendChild(br);
          counter ++;
        }
        
      });
    };

    
    
    
  }

  public dropBoxSearch2(event:any){
    var userInput =(<HTMLInputElement>document.getElementById('userInput'))!;
    var displayUserInput2 = document.getElementById("displayResults2")!;

    var keys = Object.keys(arrOfNum);
    var counter = 0;

    userInput.onkeyup = function() {
      //console.log(userInput.value);
      var result = document.createElement('p'); // is a node
      
      
      while (displayUserInput2.firstChild) {
        displayUserInput2.removeChild(displayUserInput2.lastChild!);
      }
      keys.forEach(function(key){
       

        if (arrOfNum[key].toString().includes(userInput.value) && counter == 0){
          //console.log(jsonScope[key])
          result.innerHTML =  arrOfNum[key];
          displayUserInput2.appendChild(result);
          counter ++;
        }
        
      });
   

  }

}
}
