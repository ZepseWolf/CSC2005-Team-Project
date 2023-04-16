import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface iScopeDetail{
  success: boolean;
  scopeId: string;
  actionStatus: string;
  scopeState ?: string ; 
}

@Injectable({
  providedIn: 'root'
})
export class PopoutService {

  private defaultMessage = new BehaviorSubject<string>("");
  public message = this.defaultMessage.asObservable();

  private defaultScopeDetail = new BehaviorSubject<iScopeDetail>({
    success:false,
    scopeId: "Nan",
    actionStatus: "Nan"
  });

  public scopeDetail = this.defaultScopeDetail.asObservable();
  constructor() { }
  
  public setMessage(s:string):void {
    this.defaultMessage.next(s);
    // To get message just sub to public message
  }

  public setScopeDetail(s:iScopeDetail):void {
    this.defaultScopeDetail.next(s);
  }
  
}
