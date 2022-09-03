import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http_service/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }
  onLogin(data:any){
    let fd = new FormData();
    fd.append('username', data.username);
    fd.append('password', data.password);
    fd.append('client', 'api');
    this.http.login(fd).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }
}
