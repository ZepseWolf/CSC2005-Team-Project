import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InventoryComponent } from './inventory.component';
import { SortingComponent } from './sorting.component';
import { SortingDateComponent } from './sortingDate.component';
import { FilterComponent } from './filter.component';
import { CardsComponent } from './cards.component';

import { FilterService } from './filter.service';
import { SortingService } from './sorting.service';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ Ng2SearchPipeModule,CommonModule, FormsModule, InventoryRoutingModule],
  declarations: [ InventoryComponent, SortingComponent,SortingDateComponent, FilterComponent, CardsComponent ],
  providers:    [ FilterService, SortingService ]
  
})
export class InventoryModule { }