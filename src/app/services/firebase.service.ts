import { Injectable } from '@angular/core';
import {Firestore, doc, collection, addDoc, updateDoc, deleteDoc, collectionData, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { StringLike } from '@firebase/util';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isColPropsEqual } from '@fullcalendar/angular';
// const data = require('../sampledata/userData.json');
// import userData from '../sampledata/userData.json';
// import scopeData from '../sampledata/scopeData.json';

export interface iUser{
  [key: string|number]: iUserData;
}

export interface iUserData {
  name: string;
  position: string;
  companyName: string;
  companyLocation: string;
}

export interface iScope{
  [key: string|number]: iScopeData;
};
// }

export interface iScopeData{
  id:string;
  samplingDate: string;
  status:string; // On REGULAR/ LOAN / POST REPAIR
  brand:string;
  modelNo:string;
  inShelf: boolean;
  type:string;
  history: {
    dateOfCollection: string;
    accessionNo: string;
    aerModel: string;
    aerSerial: string;
    collectedBy: string;
    circulatedBy: string;
    disinfectantUsed: string;
    disinfectantLotNo: string;
    disinfectantChanged: string;
    detergentUsed: string;
    detergentLotNo: string;
    dateFilterChanged: string;
    dateOfResult: string;
    fluidResult: string;
    fluidAnalysis: string;
    fluidActions: string;
    quaratine: boolean;
    repeatDate: string;
    remarks: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  // public userData:iUser ;
  // public scopeList:iScope ;
  public dummyUser: iUser;
  public dummyScope: iScope;
  public databaseScope : iScope;
  public gottenScopeData: boolean =false;
  public gottenScopeDatabase: boolean =false;

  private defaultScope = new BehaviorSubject<iScope|any>({});
  public scopeObs = this.defaultScope.asObservable();

  constructor(private _firestore : Firestore,private _http: HttpClient) {
    this.getJSON("assets/dataset/scopeData.json").subscribe((data:iScope) => {
      this.dummyScope= data;
      this.gottenScopeData = true;
    });
    this.getJSON("assets/dataset/userData.json").subscribe((data:iUser) => {
      this.dummyUser = data;
    });

    this.getAllScope().then((scope:iScope) => {
      this.databaseScope = scope;
      this.setScope(scope);
      this.gottenScopeDatabase = true;
    })
  }

  public setScope(s:iScope):void {
    this.defaultScope.next(s);
  }
  private getJSON(url:string): Observable<any> {
    return this._http.get(url);
  }

  resetDatabase(){
    if(this.dummyUser !== undefined && this.dummyScope !== undefined){
      console.log("start reset")
      var scopeRef = collection(this._firestore,"Scopes");
      var userRef = collection(this._firestore,"Users");
      // Genesis data , do not anyhow call this function

      var arr = Object.keys(this.dummyScope);
      var arr2 = Object.keys(this.dummyUser);
      for ( var i = 0 ; i <arr.length ;i++){
        var keyName = arr[i];
        setDoc(doc(scopeRef, keyName),  this.dummyScope[keyName]);
      }
      for ( var i = 0 ; i <arr2.length ;i++){
        var keyName = arr2[i];
        setDoc(doc(userRef, keyName),  this.dummyUser[keyName]);
      }
    }
  }

  async addScope(id:string,scope: iScopeData) {
    // Are we adding scope?
    var scopeRef = collection(this._firestore,"Scopes");
    await setDoc(doc(scopeRef, id), scope ).then((x)=>{
      console.log("New scope of Id:" ,id, "had been added." ," All data:" ,x )
    });
  }

  async getScopeById(id:string) {
    var scopesRef = doc(this._firestore, 'Scopes', id);
    var data = await getDoc(scopesRef);
    return data;
  }

  //Delete Scope
  async deleteScope(id:string) {
    let docRef = doc(this._firestore, `Scopes/${id}`);
    await deleteDoc(docRef).then((data:any)=>{
      if(data){
        console.log("Successful deleted scope id: " + id);
      }
    });
    // return callBack;
  }

  //Update Scope
  async updateScopeById(id:string,scope: iScopeData) {
    // Scope need to be the set of scope
    let scopes  = scope as any;
    var docRef = doc(this._firestore, `Scopes` , id);
    updateDoc(docRef, scopes).then( x=>{
      console.log("Successfully updated scope id : " ,id)
    });
  }

  // async updateAllScope(id:string,scope: iScope) {
    // Scope need to be the set of scope
    // var docRef = doc(this._firestore, `Scopes` , id);
    // return updateDoc(docRef, scope);
  // }

  async getAllScope(){
    var querySnapshot = await getDocs(collection(this._firestore, "Scopes"));
    // var count = 0;
    var obj = {}
    querySnapshot.forEach((doc) => {
      //put everything tgt again then save it so everyone can edit.
      obj[doc.id] = doc.data();
    });
    console.log(obj);
    this.gottenScopeDatabase = true;
    this.databaseScope = obj;
    return obj;
    // this.getJSON("assets/dataset/scopeData.json").subscribe((data:iScope) => {
      
    //   return data;
    // });
  }

  async getAllUser(){
    var querySnapshot = await getDocs(collection(this._firestore, "Users"));
    // var count = 0;
    var obj = {}
    querySnapshot.forEach((doc) => {
      //put everything tgt again then save it so everyone can edit.
      obj[doc.id] = doc.data();
    });
    console.log(obj);
    return obj;
    
  }

  async getUserById(id:string){
    var docRef = doc(this._firestore, 'User', id);
    var data = await getDoc(docRef);
    return data;
  }

  async updateUserById(id:string, user: iUserData) {
    // Scope need to be the set of scope
    let userx  = user as any;
    var docRef = doc(this._firestore, 'Users' , id);
    updateDoc(docRef, userx).then( x=>{
      console.log("Successfully updated scope id : " ,id)
    });
  }


  //Local functions
  updateScopeByIdLocal(id:string, scope:iScopeData) {
    this.dummyScope[id] = scope;
  }

}
