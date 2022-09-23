import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent{
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  notifier = new Subject();
  photo: any;
  imgSrc: any = 'assets/images/dummy.jpeg';
  emp_address1: string = '';
  emp_address2: string = '';
  emp_bgroup: string = 'N/A';
  emp_group: string = '0';
  emp_gender: string = 'Male';
  emp_type: string = 'Regular';
  showAddSuccess: boolean = false;
  showError: boolean = false;
  constructor(private http: HttpService) { }
  
  onHideForm(){
    this.onHide.emit({
      status: true
    })
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
  onCheckAddress(event:any){
    if(event.target.checked){
      this.emp_address2 = this.emp_address1;
    }
    else{
      this.emp_address2 = '';
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
      if(data.value.group === '0'){
        alert('Please select a role for employee');
      }
      else{
        fd.append('password', data.value.password);
        fd.append('password2', data.value.password);
        this.http.add_user(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
          this.showAddSuccess = true;
        },err => {
          this.showError = true;
        })
      }
    }
  }
}
