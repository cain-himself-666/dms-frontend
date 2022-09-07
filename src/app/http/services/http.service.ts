import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(fd:any){
    return this.http.post<any>(`${URL}/api/auth/login/`, fd);
  }
  registration(fd:any){
    return this.http.post<any>(`${URL}/api/user/reg`, fd);
  }
  logout(){
    return this.http.post(`${URL}/api/auth/logout/`,{});
  }
  case_entry(fd:any){
    return this.http.post<any>(`${URL}/api/old_case_master`, fd);
  }
  document_type(){
    return this.http.get<any>(`${URL}/api/document_type`);
  }
  add_document(fd:any){
    return this.http.post(`${URL}/api/old_case_document`, fd);
  }
  get_documents(case_id: any){
    return this.http.get<any>(`${URL}/api/old_case_document`, { params: { case_id: case_id}});
  }
}
