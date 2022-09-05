import { Injectable } from '@angular/core';
const TOKEN = 'token';
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
  public clearSession(){
    window.localStorage.clear();
  }
}
