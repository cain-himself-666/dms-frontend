import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  @Output() displayChangePass: any = new EventEmitter<{status: boolean}>();
  @Input() employee: any;
  @Input('id') user_id: any;
  @Input() profileId: any;
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
  showUpdateSuccess: boolean = false;
  showError: boolean = false;
  photo: any;
  imgSrc: any;
  notifier = new Subject();
  profile_id: string = '';
  id: string = '';
  constructor(private http: HttpService) { }
  ngOnInit(): void {
    this.e_name = this.employee.e_name;
    this.e_contact = this.employee.e_contact;
    this.e_dob = this.employee.e_dob;
    this.e_gender = this.employee.e_gender;
    this.e_bgroup = this.employee.e_bgroup;
    this.e_email = this.employee.e_email;
    this.emp_address1 = this.employee.e_corr_add;
    this.emp_address2 = this.employee.e_perm_add;
    this.e_id = this.employee.e_id;
    this.e_role = this.employee.e_role;
    this.e_type = this.employee.e_type;
    this.imgSrc = this.employee.e_photo;
    this.id = this.user_id;
    this.profile_id = this.profileId;
    this.e_username = this.employee.e_username;
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
  onShowChangePass(){
    this.displayChangePass.emit({
      status: true,
      username: this.e_username,
      id: this.id,
      email: this.e_email,
      group: this.e_role
    })
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
  onRegistration(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      if(this.photo){
        fd.append('employee_photo', this.photo);
      }
      fd.append('employee_id', data.value.employee_id);
      fd.append('employee_name', data.value.name);
      fd.append('employee_contact', data.value.contact);
      fd.append('employee_date_of_birth', data.value.dob);
      fd.append('employee_gender', data.value.gender);
      fd.append('employee_blood_group', data.value.bgroup);
      fd.append('employee_type', data.value.empType);
      fd.append('employee_corresponding_address', data.value.address1);
      fd.append('email', data.value.email);
      fd.append('employee_permanent_address', data.value.address2);
      fd.append('group', data.value.group);
      fd.append('username', data.value.username);
      fd.append('profile_id', this.profile_id);
      fd.append('id', this.id);
      if(data.value.group === '0'){
        alert('Please select a role for employee');
      }
      this.http.update_profile(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.http.update_user(fd).pipe(takeUntil(this.notifier)).subscribe(data => {});
          this.showUpdateSuccess = true;
          this.showError = false;
        },err => {
          this.showUpdateSuccess = false;
          this.showError = true;
      })
    }
  }
}
