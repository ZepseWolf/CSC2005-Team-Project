import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  constructor(private _router:Router) {
    // _router.events.subscribe((url:any) => {

    // });
   }

  showLogout:boolean = false;
  local_isLoggedIn:boolean = false;
  local_currentUserRole:string = '';
  arrSuggestion:any =[];
  showSuggestion:boolean = false;
  userName:string = '';

  @ViewChild("suggestion") suggestion!: ElementRef;
  
  ngOnInit(): void {

  }

  ngOn
  public showRecommendation(value:string):void {
    var search_terms:any[] = [
      {
        "label" : "home",
        "url" : "/home" ,
      },
      {
        "label": "my profile",
        "url" : "/info/myProfile"
      },
      {
        "label": "my activity",
        "url" : "/info/myActivity"
      },
      {
        "label": "generate cv",
        "url" : "/info/generateCv"
      },
      {
        "label": "teaching philosophy",
        "url" : "/info/teachingPhilosophy"
      },
      {
        "label": "research strategy",
        "url" : "/info/researchStrategy"
      },
      {
        "label": "staff infomation",
        "url" : "/staff"
      },
      {
        "label": "classroom Teaching",
        "url" : "/teach/classroom"
      },
      {
        "label": "iwsp supervision",
        "url" : "/teach/iwspSupervision"
      },
      {
        "label": "project supervision",
        "url" : "/teach/projectSupervision"
      },
      {
        "label": "module development",
        "url" : "/teach/moduleDevelopment"
      }
    ];

    this.arrSuggestion=[];
    this.showSuggestion = false;
    var count = 0;
    for (var i in search_terms){
      if( search_terms[i].label.includes(value)){
        if(count<10){
          this.arrSuggestion.push(search_terms[i]);
          this.showSuggestion = true;
          count++;
        }
        else{
          break;
        }
      }
    }
  }

  public closeSuggestion():void{
    this.arrSuggestion = [];
    this.showSuggestion = false;
  }

  public profileDropdown():void{
    this.showLogout = !this.showLogout;
  }

  public logout():void{

  }

  ngAfterViewInit(): void {
  }

  public closePopout(event:any){
    event.srcElement.parentElement.classList.toggle("show");
  }
}
