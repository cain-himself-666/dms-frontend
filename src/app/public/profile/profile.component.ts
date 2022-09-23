import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showChangePassword: boolean = true;
  showDetails: boolean = false;
  showPassUpdate: boolean = false;
  toggle: boolean = true;
  id: string = '';
  pass1: string = '';
  pass2: string = '';
  emp_name: string = '';
  emp_type: string = '';
  emp_uname: string = '';
  emp_gender: string = '';
  emp_add: string = '';
  emp_email: string = '';
  emp_bgroup: string = '';
  user_profile: any;
  group: string = '';
  imgSrc: string = '';
  notifier = new Subject();
  constructor(private local_storage: LocalstorageService, private http: HttpService) { }

  ngOnInit(): void {
    this.user_profile = this.local_storage.getUserData();
    this.group = this.local_storage.getUserGroup();
    this.id = this.user_profile.id;
    this.emp_name = this.user_profile.related_profile.employee_name || 'N/A';
    this.emp_type = this.user_profile.related_profile.employee_type || 'N/A';
    this.emp_gender = this.user_profile.related_profile.employee_gender || 'N/A';
    this.emp_add = this.user_profile.related_profile.employee_permanent_address || 'N/A';
    this.emp_email = this.user_profile.email || 'N/A';
    this.emp_uname = this.user_profile.username || 'N/A';
    this.emp_bgroup = this.user_profile.related_profile.employee_blood_group || 'N/A';
    if(this.user_profile.related_profile.employee_photo === null){
      this.imgSrc = 'assets/images/dummy.jpeg';
    }
    else{
      this.imgSrc = this.user_profile.related_profile.employee_photo;
    }
  }
  onShowChangePassword(){
    this.showChangePassword = false;
    this.showDetails = true;
    this.showPassUpdate = false;
    this.toggle = !this.toggle;
  }
  onShowDetails(){
    this.showChangePassword = true;
    this.showDetails = false;
    this.showPassUpdate = false;
    this.toggle = !this.toggle;
  }
  onChangePassword(data:any){
    let fd = new FormData();
    fd.append('id', this.id);
    fd.append('username', this.emp_uname);
    fd.append('group', this.group);
    fd.append('password', data.password);
    fd.append('password2', data.password2);
    this.http.update_user(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.showPassUpdate = true;
      this.pass1 = '';
      this.pass2 = '';
    })
  }
}
