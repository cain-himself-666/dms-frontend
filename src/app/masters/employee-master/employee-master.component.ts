import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showData: boolean = false;
  users: any = [];
  e_name: string = '';
  e_contact: string = '';
  e_dob: string = '';
  e_gender: string = '';
  e_bgroup: string = '';
  e_email:string = '';
  e_id:string = '';
  e_type:string = '';
  e_role:string = '';
  e_username:string = '';
  emp_address1: string = '';
  emp_address2: string = '';
  password1: string = '';
  password2: string = '';
  id: string = '';
  photo: any;
  imgSrc: any;
  showForm: boolean = false;
  showAddSuccess: boolean = false;
  showUpdateSuccess: boolean = false;
  showPassUpdate: boolean = false;
  showError: boolean = false;
  buffer: number = 0;
  profile_id: string = '';
  showDetails: boolean = false;
  showPassword: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.getUser();
  }
  onCheckAddress(event:any){
    if(event.target.checked){
      this.emp_address2 = this.emp_address1;
    }
    else{
      this.emp_address2 = '';
    }
  }
  onHandleEvent(event:any){
    if(event.target.files && event.target.files[0]){
      this.photo = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { 
        this.imgSrc = event.target!.result;
      }
    }
    if(!event.target.files && !event.target.files[0]){
      this.photo = '';
    }
  }
  onShowEntryForm(){
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
    this.showError = false;
    this.showForm = !this.showForm;
    this.e_name = '';
    this.e_contact = '';
    this.e_bgroup = 'N/A';
    this.e_dob = '';
    this.e_email = '';
    this.e_id = '';
    this.emp_address1 = '';
    this.emp_address2 = '';
    this.e_role = '0';
    this.e_username = '';
    this.e_type = 'N/A';
    this.e_gender = 'N/A';
    this.imgSrc = 'assets/images/dummy.jpeg';
    this.showDetails = true;
    this.showPassword = true;
  }
  onShowForm(id:string){
    this.showDetails = true;
    this.showPassword = false;
    this.buffer = 1;
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
    this.showError = false;
    this.http.get_user(id).subscribe(data => {
      this.id = data.id;
      // console.log(data);
      this.profile_id = data.related_profile.id;
      this.showForm = !this.showForm;
      this.e_name = data.related_profile.employee_name;
      this.e_contact = data.related_profile.employee_contact;
      this.e_bgroup = data.related_profile.employee_blood_group;
      this.e_dob = data.related_profile.employee_date_of_birth;
      this.e_email = data.email;
      this.e_id = data.related_profile.employee_id;
      this.emp_address1 = data.related_profile.employee_corresponding_address;
      this.emp_address2 = data.related_profile.employee_permanent_address;
      this.e_role = data.related_groups[0].id;
      this.e_username = data.username;
      this.e_type = data.related_profile.employee_type;
      this.e_gender = data.related_profile.employee_gender;
      this.imgSrc = data.related_profile.employee_photo;
    })
  }
  onHideForm(){
    this.showForm = !this.showForm;
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
    this.showError = false;
    this.showPassword = false;
    this.buffer = 0;
    this.getUser();
  }
  onShowChangePassword(){
    this.showPassword = true;
    this.showDetails = false;
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
    this.showError = false;
    document.getElementById('username')?.setAttribute('disabled','');
    this.buffer = 2;
  }
  onShowDetails(){
    this.showPassword = false;
    this.showDetails = true;
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
    this.showError = false;
    document.getElementById('username')?.removeAttribute('disabled');
    this.showPassUpdate = false;
    this.buffer = 1;
  }
  onRegistration(data:any, gender: string, bgroup:string, empType: string, group:string){
    let fd = new FormData();
    if(this.photo){
      fd.append('employee_photo', this.photo);
    }
    fd.append('employee_id', data.employee_id);
    fd.append('employee_name', data.name);
    fd.append('employee_contact', data.contact);
    fd.append('employee_date_of_birth', data.dob);
    fd.append('employee_gender', gender);
    fd.append('employee_blood_group', bgroup);
    fd.append('employee_type', empType);
    fd.append('employee_corresponding_address', data.address1);
    fd.append('email', data.email);
    fd.append('employee_permanent_address', data.address2);
    fd.append('group', group);
    fd.append('username', data.username);
    if(this.buffer === 0){
      fd.append('password', data.password);
      fd.append('password2', data.password);
      this.http.add_user(fd).subscribe(data => {
        this.showAddSuccess = true;
        this.showUpdateSuccess = false;
        this.showError = false;
        this.showPassUpdate = false;
      },err => {
        this.showAddSuccess = false;
        this.showUpdateSuccess = false;
        this.showError = true;
        this.showPassUpdate = false;
      })
    }
    else if(this.buffer === 1){
      fd.append('profile_id', this.profile_id);
      fd.append('id', this.id);
      this.http.update_profile(fd).subscribe(data => {
        this.http.update_user(fd).subscribe(data => {});
        this.showUpdateSuccess = true;
        this.showAddSuccess = false;
        this.showPassUpdate = false;
        this.showError = false;
      },err => {
        this.showAddSuccess = false;
        this.showUpdateSuccess = false;
        this.showError = true;
        this.showPassUpdate = false;
      })
    }
    else{
      fd.append('id', this.id);
      fd.append('password', this.password1);
      fd.append('password2', this.password2);
      this.http.update_user(fd).subscribe(data => {
        this.showPassUpdate = true;
      },err => {
        console.log(err);
      })
    }
  }
  isDelete(id:string, is_delete: boolean){
    let i:any;
    if(is_delete){
      i = false;
    }
    else{
      i=true;
    }
    let fd = new FormData();
    fd.append('employee_isDeleted', i);
    fd.append('id', id);
    this.http.update_user_isDelete(fd).subscribe(data =>{
      this.getUser();
    })
  }
  getUser(){
    this.http.get_users().subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.users = data.results;
      }
    })
  }
}
