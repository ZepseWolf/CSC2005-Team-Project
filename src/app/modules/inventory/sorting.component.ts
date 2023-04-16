import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sorting',
  templateUrl: './sorting.component.html'
})
export class SortingComponent  {

  @Output() sort = new EventEmitter();

  sortingChange = false;

  onSort() {
    this.sortingChange = true;
    this.sort.emit(this.sortingChange);
  }

}
