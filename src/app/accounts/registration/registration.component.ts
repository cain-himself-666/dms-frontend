import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpService, private local_storage: LocalstorageService) { }

  ngOnInit(): void {
  }
  onRegistration(data:any, user:string){
    let fd = new FormData();
    fd.append('username', data.username);
    fd.append('password', data.pass);
    fd.append('password2', data.confPass);
    fd.append('first_name', data.fname);
    fd.append('last_name', data.lname);
    fd.append('email', data.email);
    fd.append('contact_number', data.contact);
    fd.append('group', user);
    this.http.registration(fd).subscribe(data => {
      console.log(data);
    })
  }
}
