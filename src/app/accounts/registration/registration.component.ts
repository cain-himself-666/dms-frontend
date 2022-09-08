import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emp_address1: string = '';
  emp_address2: string = '';
  emp_photo: any;
  constructor(private http: HttpService, private local_storage: LocalstorageService) { }

  ngOnInit(): void {}
  onPhotoUpload(event: any){
    if(event.target.files[0]){
      this.emp_photo = event.target.files[0];
    }
  }
  onCheckAddress(event: any){
    if(event.target.checked){
      this.emp_address2 = this.emp_address1;
    }
    else{
      this.emp_address2 = '';
    }
  }
  onRegistration(data:any, gender: string, bgroup:string, empType: string){
    let fd = new FormData();
    fd.append('employee_id', data.employee_id);
    fd.append('employee_name', data.name);
    fd.append('employee_contact', data.contact);
    fd.append('employee_date_of_birth', data.dob);
    fd.append('employee_gender', gender);
    fd.append('employee_blood_group', bgroup);
    fd.append('employee_type', empType);
    fd.append('employee_photo', this.emp_photo);
    fd.append('employee_corresponding_address', data.address);
    fd.append('employee_permanent_address', data.perm_address);
    this.http.add_user(fd).subscribe(data => {
      console.log(data);
    })
    console.log(data, gender, bgroup, empType, this.emp_photo);
  }
}
