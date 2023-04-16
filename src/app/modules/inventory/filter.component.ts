import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import scopejson from "./scope.json";


interface SCOPES {
  status: String;
  checked:boolean;
}


@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls:['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filter = new EventEmitter();

  status: SCOPES[] = scopejson;

  public ngOnInit() {
    this.onFilter();
  }

  public onFilter() {
    this.filter.emit(
      this.status
        .filter(opt => opt.checked)
        .map(opt => opt.status));
  }
}
