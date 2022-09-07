import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emp_name: string = '';
  emp_contact: string = '';
  emp_email: string = '';
  emp_address1: string = '';
  emp_address2: string = '';
  emp_username: string = '';
  emp_password: string = '';
  emp_id: string = '';
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
    console.log(data, gender, bgroup, empType, this.emp_photo);
  }
}
