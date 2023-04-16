import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // service is registered in root module(app.module.ts) //
})
export class DynamicTableService {

  private url: any = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getTableDatas() {
    return this.http.get(this.url + '/users'); // fetching the data from REST api //
  }
}