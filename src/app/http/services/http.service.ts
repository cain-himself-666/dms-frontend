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
  logout(){
    return this.http.post(`${URL}/api/auth/logout/`,{});
  }
  changePassword(fd:any){
    return this.http.patch(`${URL}/api/user/standalone/reg/${fd.get('id')}`, fd);
  }
  case_entry(fd:any){
    return this.http.post<any>(`${URL}/api/old_case_master`, fd);
  }
  update_case(fd:any, id:string){
    return this.http.patch(`${URL}/api/old_case_master/${id}`, fd);
  }
  document_type(){
    return this.http.get<any>(`${URL}/api/document_type`);
  }
  add_document_type(fd:any){
    return this.http.post(`${URL}/api/document_type`,fd);
  }
  update_document_type(fd:any){
    return this.http.patch(`${URL}/api/document_type/${fd.get('id')}`,fd);
  }
  get_document_type(id:any){
    return this.http.get<any>(`${URL}/api/document_type/${id}`);
  }
  add_document(fd:any){
    return this.http.post(`${URL}/api/old_case_document`, fd);
  }
  get_documents(case_id: any){
    return this.http.get<any>(`${URL}/api/old_case_document`, { params: { case_id: case_id}});
  }
  delete_document(id: string){
    return this.http.delete(`${URL}/api/old_case_document/${id}`);
  }
  add_complex(fd:any){
    return this.http.post(`${URL}/api/complex`, fd);
  }
  get_complex(){
    return this.http.get<any>(`${URL}/api/complex`);
  }
  get_single_complex(id: number){
    return this.http.get<any>(`${URL}/api/complex/${id}`);
  }
  update_complex(fd:any){
    return this.http.put(`${URL}/api/complex/${fd.get('id')}`, fd);
  }
  add_designation(fd:any){
    return this.http.post(`${URL}/api/designation`, fd);
  }
  get_designations(){
    return this.http.get<any>(`${URL}/api/designation`);
  }
  get_designation(id: number){
    return this.http.get<any>(`${URL}/api/designation/${id}`);
  }
  update_designation(fd: any){
    return this.http.put(`${URL}/api/designation/${fd.get('id')}`, fd);
  }
  add_department(fd:any){
    return this.http.post(`${URL}/api/department`, fd);
  }
  get_departments(){
    return this.http.get<any>(`${URL}/api/department`)
  }
  get_department(id: number){
    return this.http.get<any>(`${URL}/api/department/${id}`);
  }
  get_corresponding_department(id:number){
    return this.http.get<any>(`${URL}/api/department?complex_id=${id}`);
  }
  update_department(fd:any){
    return this.http.put(`${URL}/api/department/${fd.get('id')}`,fd);
  }
  add_user(fd:any){
    return this.http.post(`${URL}/api/user/reg`,fd);
  }
  get_users(){
    return this.http.get<any>(`${URL}/api/user/reg`);
  }
  get_user(id: string){
    return this.http.get<any>(`${URL}/api/user/reg/${id}`);
  }
  update_profile(fd:any){
    return this.http.patch(`${URL}/api/user/profile/${fd.get('profile_id')}`,fd);
  }
  update_user(fd:any){
    return this.http.patch(`${URL}/api/user/standalone/reg/${fd.get('id')}`, { email: fd.get('email'), password: fd.get('password'), password2: fd.get('password2'), group: fd.get('group')});
  }
  allocate_designation(fd:any){
    return this.http.post(`${URL}/api/designation/allocation`,fd);
  }
  allocate_duty(fd:any){
    return this.http.post(`${URL}/api/duty/allocation`,fd);
  }
  get_old_cases(){
    return this.http.get<any>(`${URL}/api/old_case_master`);
  }
  get_old_case(id:string){
    return this.http.get<any>(`${URL}/api/old_case_master/${id}`);
  }
  update_old_case(fd:any){
    return this.http.put(`${URL}/api/old_case_master/${fd.get('id')}`,fd);
  }
  get_new_cases(){
    return this.http.get<any>(`${URL}/api/new_case_master`);
  }
  update_user_isDelete(fd:any){
    return this.http.patch(`${URL}/api/user/profile/${fd.get('id')}`,fd);
  }
  update_complex_isDelete(fd:any){
    return this.http.patch(`${URL}/api/complex/${fd.get('id')}`,fd);
  }
  update_department_isDelete(fd:any){
    return this.http.patch(`${URL}/api/department/${fd.get('id')}`,fd);
  }
  update_designation_isDelete(fd:any){
    return this.http.patch(`${URL}/api/designation/${fd.get('id')}`,fd);
  }
  search(query:string){
    return this.http.get<any>(`${URL}/api/old_case_master?search_text=${query}`)
  }
  approve_case(fd:any){
    return this.http.patch(`${URL}/api/old_case_master/${fd.get('id')}`, { approval_remarks: fd.get('remarks'), is_approved: fd.get('is_approved')});
  }
  get_case_types(){
    return this.http.get<any>(`${URL}/api/cis/case_type`);
  }
  get_case_result(){
    return this.http.get<any>(`${URL}/api/cis/case_type`);
  }
  get_case_details(fd:any){
    return this.http.get<any>(`${URL}/api/cis/civil_t`, { params: { case_type: fd.get('case_type'), case_no: fd.get('case_number'), case_year: fd.get('case_year')}});
  }
}
