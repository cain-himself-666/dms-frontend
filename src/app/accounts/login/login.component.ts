import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpService, private local_storage: LocalstorageService, private route: Router) { }
  notifier = new Subject();
  ngOnInit(): void {
  }
  onLogin(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('username', data.value.username);
      fd.append('password', data.value.password);
      fd.append('client', 'api');
      this.http.login(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.local_storage.saveToken(data.token);
        this.local_storage.saveUser(JSON.stringify(data.user));
        window.location.href="/dashboard"
        }, err => {
          if(err.error.non_field_errors){
            alert('User Credentials Invalid !! Please Try Again');
          }
          else{
            alert('Login Failed !! Please try again after sometime');
          }
          window.location.href="/login"
      })
    }
  }
}
