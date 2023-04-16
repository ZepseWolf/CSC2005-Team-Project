import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sortingDate',
  templateUrl: './sortingDate.component.html'
})
export class SortingDateComponent  {

  @Output() sort = new EventEmitter();

  sortingChange = false;

  onSortDate() {
    this.sortingChange = true;
    this.sort.emit(this.sortingChange);
  }

}
