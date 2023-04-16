import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throws } from 'assert';
import { FireBaseService } from 'src/app/services/firebase.service';
import { PopoutService } from 'src/app/services/popout.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit,OnDestroy{
  @ViewChild('mainContainer') mainContainer!: ElementRef;
  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e:any) {
    this.svgCurve(e.pageX,e.pageY);
  }
  flag:number = 0;
  height = window.innerHeight;
  x= 0; 
  y= this.height/2;
  curveX = 10;
  curveY = 0;
  targetX = 0;
  xitteration = 0;
  yitteration = 0;
  menuExpanded = false;

  show:boolean = false;
  showInformation:boolean = false;
  prevIcon :any;
  prevLi:any ;

  myObserver: any;
  constructor(
    public _router: Router ,
    private modalService: NgbModal,
    private _popoutService:PopoutService,
    private _fireBaseService:FireBaseService
    ) {
    this.myObserver= this._router.events.subscribe((url:any) => {
      if(url instanceof NavigationEnd){
        this.changeIconColor(this._router.url);
      }
    });
  }

  ngOnDestroy() {
    this.myObserver.unsubscribe();
  }

  ngOnInit():void{
    this.prevIcon = document.getElementById("menu-home-icon");
    this.prevLi =  document.getElementById("menu-home");
    // this.route.params.subscribe( (val: any) => {  
    //   if (val instanceof NavigationStart) {
    //     this.changeIconColor(this._router.url);
    //   }
    //   });
      // document.querySelector(this)?.addEventListener('mousemove', function(e){
      //   x = e.pageX;
      //   y = e.pageY;
      // });
      // document.querySelectorAll(".question-icon").forEach((e:any)=>{
      //   e.style.display = "none";
      // })
      var blob = document.getElementById('blob') as any;
      var blobPath = document.getElementById('blob-path') as any;
    
      var hamburger = document.getElementById('hamburger') as any;
      document.querySelector(' .menu-inner')?.addEventListener('mouseenter', (e:any)=>{
        
        var icon =  document.getElementById("icons") as any;
        icon.style.animation = "fadeOut 0.2s forwards";

      	// e.target.parentElement.children[1].classList.add('expanded');
        e.target.parentElement.classList.add('expanded');
        document.querySelectorAll(".question-icon").forEach((e:any)=>{
          e.style.animation = "fadeIn 0.2s forwards";
        })
        // e.target.style.width = "300px";
      	this.menuExpanded = true;
      });

      document.querySelector('.menu-inner')?.addEventListener('mouseleave', (e:any)=>{
        this.menuExpanded = false;
        // e.target.style.width = "60px";
        var icon =  document.getElementById("icons") as any;
        icon.style.animation = "fadeIn 0.5s forwards";
        e.target.parentElement.classList.remove('expanded');
        // e.target.parentElement.children[1].classList.remove('expanded');
        document.querySelectorAll(".question-icon").forEach((e:any)=>{
          e.style.animation = "fadeOut 0.2s forwards";
        })
      });
    
      // window.requestAnimationFrame(svgCurve);
  }

  changeIconColor(url:string):void{
    setTimeout(()=>{
      if (url == "/home"){
        var i  = document.getElementById("menu-home-icon") as any;
        var x = document.getElementById("menu-home") as any;
        i.classList.toggle("add-color");
        x.classList.toggle("add-color");
        // console.log("i")
        if(this.prevIcon!== undefined && this.prevLi !== undefined){
          this.prevIcon.classList.toggle("add-color");
          this.prevLi.classList.toggle("add-color");
        }
        this.prevIcon = i;
        this.prevLi = x;
      }
      else if(url == "/calendar"){
        var i  = document.getElementById("menu-calendar-icon") as any;
        var x = document.getElementById("menu-calendar") as any;
        i.classList.toggle("add-color");
        x.classList.toggle("add-color");
        if(this.prevIcon!== undefined && this.prevLi !== undefined){
          this.prevIcon.classList.toggle("add-color");
          this.prevLi.classList.toggle("add-color");
        }
        this.prevIcon = i;
        this.prevLi = x;
      }
      else if (url == "/inventory"){
        var i  = document.getElementById("menu-inventory-icon") as any;
        var x = document.getElementById("menu-inventory") as any;
        i.classList.toggle("add-color");
        x.classList.toggle("add-color");
        if(this.prevIcon!== undefined && this.prevLi !== undefined){
          this.prevIcon.classList.toggle("add-color");
          this.prevLi.classList.toggle("add-color");
        }
        this.prevIcon = i;
        this.prevLi = x;
        
      }
      else if(url == "/equipmentstatus"){
        var i  = document.getElementById("menu-status-icon") as any;
        let x = document.getElementById("menu-status") as any;
        i.classList.toggle("add-color");
        x.classList.toggle("add-color");
        if(this.prevIcon!== undefined && this.prevLi !== undefined){
          this.prevIcon.classList.toggle("add-color");
          this.prevLi.classList.toggle("add-color");
        }
        this.prevIcon = i;
        this.prevLi = x;
      }
      else if (url == "/profile"){
        // var i  = document.getElementById("menu-inventory-icon") as any;
        // var x = document.getElementById("menu-inventory") as any;
        // i.classList.toggle("add-color");
        // x.classList.toggle("add-color");
        if(this.prevIcon!== undefined && this.prevLi !== undefined){
          this.prevIcon.classList.toggle("add-color");
          this.prevLi.classList.toggle("add-color");
        }
        this.prevIcon = undefined;
        this.prevLi = undefined;
        
      }
    },1);
    
  }

  svgCurve(x:number, y:number) {
    var blob = document.getElementById('blob') as any;
    var blobPath = document.getElementById('blob-path') as any;
  
    var hamburger = document.getElementById('hamburger') as any;

    var hoverZone = 150;
    var expandAmount = 20;
    if ((this.curveX > x-1) && (this.curveX < x+1)) {
      this.xitteration = 0;
    } else {
      if (this.menuExpanded) {
        this.targetX = 0;
      } else {
        this.xitteration = 0;
        if (x > hoverZone) {
          this.targetX = 0;
        } else {
          this.targetX = -(((60+expandAmount)/100)*(x-hoverZone));
        }			
      }
      this.xitteration++;
    }

    if ((this.curveY > y-1) && (this.curveY < y+1)) {
      this.yitteration = 0;
    } else {
      this.yitteration = 0;
      this.yitteration++;	
    }

    this.curveX = this.easeOutExpo(this.xitteration, this.curveX, this.targetX-this.curveX, 100);
    this.curveY = this.easeOutExpo(this.yitteration, this.curveY, y-this.curveY, 100);

    var anchorDistance = 200;
    var curviness = anchorDistance - 40;

    var newCurve2 = "M60,"+this.height+"H0V0h60v"+(this.curveY-anchorDistance)+"c0,"+curviness+","+this.curveX+","+curviness+","+this.curveX+","+anchorDistance+"S60,"+(this.curveY)+",60,"+(this.curveY+(anchorDistance*2))+"V"+this.height+"z";

    blobPath.attributes["d"].value = newCurve2;

    blob.style.width= this.curveX+60;
    // hamburger.style.transform = 'translate('+this.curveX+'px, '+this.curveX+'px)'
    
    // document.querySelector('h2').css('transform', 'translateY('+curveY+'px)');
    // window.requestAnimationFrame(this.svgCurve);
  }

  easeOutExpo(currentIteration: number, startValue: number, changeInValue: number, totalIterations: number) {
    return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
  }

  public dropdownInfo():void{
    if(this.showInformation){
      this.showInformation = false
    }else{
      this.showInformation = true
    }
  }

  public showInstruction(event:any,toShow :boolean){
      if(toShow){
        event.target.parentElement.children[1].classList.remove("hide");
      }else{
        event.target.parentElement.children[1].classList.add("hide");
      }
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
