import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { KEY } from 'src/environments/environment.prod';
const TOKEN = 'token';
const DETAILS = 'details'
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public getToken(){
    return window.localStorage.getItem(TOKEN);
  }
  public saveToken(token: string){
    if(window.localStorage.getItem(TOKEN)){
      window.localStorage.removeItem(TOKEN);
    }
    window.localStorage.setItem(TOKEN, token);
  }
  public saveUser(details:any){
    if(window.localStorage.getItem(DETAILS)){
      window.localStorage.removeItem(DETAILS);
    }
    window.localStorage.setItem(DETAILS, CryptoJS.AES.encrypt(details, KEY).toString());
  }
  public getUserGroup(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_groups[0].name;
  }
  public getUserName(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.username;
  }
  public clearSession(){
    window.localStorage.clear();
  }
}
