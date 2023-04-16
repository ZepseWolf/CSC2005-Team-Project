import { Component, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { LifeCycleService } from 'src/app/services/life-cycle.service';
import { SortingService } from './sorting.service';
import { FilterService } from './filter.service';
import { FireBaseService, iScope } from 'src/app/services/firebase.service';
// import sampleinv from "../../../assets/dataset/scopeData.json"

interface ITEMS {
  scopeID: String;
  scope: String;
  scheduledsamplingdate: String;
  status: String;
}

class Scope implements ITEMS {
  scopeID: String;
  scope: String;
  scheduledsamplingdate: String;
  type: String;
  status: String;

  constructor(id: String, date: String, status: String, type: String) {
    this.scopeID = id;
    this.scope = "OLYMPUS";
    this.type = type;
    this.scheduledsamplingdate = date;
    this.status = status;
  }
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {

  public filteredCards;
  public allScopeArr: any[] = [];

  constructor(
    private _lifeCycleService: LifeCycleService,
    private sortingService: SortingService,
    private filterService: FilterService,
    private fbservice: FireBaseService) {


  }

  searchText;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._lifeCycleService.initCheck();
    }, 1000)

  }

  ngOnInit(): void {
    // while(!this.fbservice.gottenScopeData){
    // }
    this.fbservice.scopeObs.subscribe((data:iScope) =>{
      var rs = data;
      this.allScopeArr = [];
      Object.keys(rs).forEach((k) => {
        if (rs[k]) {
    
          this.allScopeArr.push(rs[k]);
        } else {
          console.log('⛔️ Object is falsy');
        }
      })
    this.filteredCards = this.allScopeArr;
    console.log(this.fbservice.databaseScope);
    })
    
    // this.refreshDatabase();
    // setTimeout(()=>{
    //   Object.keys(sampleinv).forEach((k) =>{
    //     if (sampleinv[k]){
    //       this.arr.push(sampleinv[k]);
    //     }
    //   });

    //   this.filteredCards = this.arr;
    // },1)
    //I dont have subscription :(
  }


  private sorteringClick!: boolean;
  private sorteringdateClick!: boolean;

  public refreshDatabase(){
    
  }

  onSort(sortingChange) {
    this.sorteringClick = sortingChange;
    // console.log(this.filteredCards)
    this.filteredCards = this.sortingService.sortByNameAlphebeticallyAscending(this.filteredCards);
    this.fbservice.setScope(this.fbservice.databaseScope);
  }

  onSortDate(sortingdateChange) {
    this.sorteringdateClick = sortingdateChange;
    this.filteredCards = this.sortingService.sortByDate(this.filteredCards);
    this.fbservice.setScope(this.fbservice.databaseScope);
    // console.log(this.filteredCards)
  }

  onFilter(checkedValues) {
    let filtered = this.allScopeArr.filter(object => {
      return checkedValues.find(checkedType => checkedType === object.status);
    });
    if (this.sorteringClick) {
      filtered = this.sortingService.sortByNameAlphebeticallyAscending(filtered);
    }
    else if (this.sorteringdateClick) {
      filtered = this.sortingService.sortByDate(filtered);
    }
    this.filteredCards = filtered;
  }

}
