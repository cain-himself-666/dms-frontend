import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showChangePassword: boolean = true;
  showDetails: boolean = false;
  toggle: boolean = true;
  emp_name: string = '';
  emp_type: string = '';
  emp_uname: string = '';
  emp_gender: string = '';
  emp_add: string = '';
  emp_email: string = '';
  emp_bgroup: string = '';
  user_profile: any;
  imgSrc: string = '';
  constructor(private local_storage: LocalstorageService) { }

  ngOnInit(): void {
    this.user_profile = this.local_storage.getUserData();
    this.emp_name = this.user_profile.related_profile.employee_name || 'N/A';
    this.emp_type = this.user_profile.related_profile.employee_type || 'N/A';
    this.emp_gender = this.user_profile.related_profile.employee_gender || 'N/A';
    this.emp_add = this.user_profile.related_profile.employee_permanent_address || 'N/A';
    this.emp_email = this.user_profile.email || 'N/A';
    this.emp_uname = this.user_profile.username || 'N/A';
    this.emp_bgroup = this.user_profile.related_profile.employee_blood_group || 'N/A';
    this.imgSrc = this.user_profile.related_profile.employee_photo;
  }
  onShowChangePassword(){
    this.showChangePassword = false;
    this.showDetails = true;
    this.toggle = !this.toggle;
  }
  onShowDetails(){
    this.showChangePassword = true;
    this.showDetails = false;
    this.toggle = !this.toggle;
  }
}
