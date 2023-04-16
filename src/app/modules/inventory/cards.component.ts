import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} 
from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls:['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() cards;
  cardsView:any[]=[];
  closeResult = '';
  public selectedhistorydata;
  public items;

  constructor(private modalService: NgbModal,private _fireBaseService: FireBaseService) {
    
  }
  ngOnInit(): void {
    // console.log(this.cards);
    this._fireBaseService.scopeObs.subscribe((data)=>{
      console.log(this.cards);
      this.cardsView = [];
      this.cards.forEach((k) => {
        if (k) {
          this.cardsView.push(
            {
              id:k.id,
              samplingDate: k.samplingDate,
              status: k.status,
              brand:k.brand,
              modelNo: k.modelNo,
              inShelf: k.inShelf,
              type:k.type,
            }
          )
        } else {
          console.log('⛔️ Object is falsy');
        }
      });
    })
  }
  open(content , history) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title' ,size: 'lg', backdrop: 'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.selectedhistorydata = history;
  }

  opendetails(content2 , item) {
    this.modalService.open(content2,
   {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.items = item;
  }

  inShelf(item:any){
    if(item){
      return "In Shelf"
    }else{
      return "Not In Shelf"
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  searchText;

}
