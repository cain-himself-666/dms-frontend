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
  photo: any;
  imgSrc: any;
  showForm: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.http.get_users().subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.users = data.results;
        console.log(data);
      }
    })
    this.imgSrc = 'assets/images/dummy.jpeg';
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
  }
  onShowEntryForm(){
    this.showForm = !this.showForm;
    this.e_name = '';
    this.e_contact = '';
    this.e_bgroup = '';
    this.e_dob = '';
    this.e_email = '';
    this.e_id = '';
    this.emp_address1 = '';
    this.emp_address2 = '';
    this.e_role = '';
    this.e_username = '';
  }
  onHideForm(){
    this.showForm = !this.showForm;
  }
  onRegistration(data:any, gender: string, bgroup:string, empType: string, group:string){
    let fd = new FormData();
    fd.append('employee_id', data.employee_id);
    fd.append('employee_name', data.name);
    fd.append('employee_contact', data.contact);
    fd.append('employee_date_of_birth', data.dob);
    fd.append('employee_gender', gender);
    fd.append('employee_blood_group', bgroup);
    fd.append('employee_type', empType);
    fd.append('employee_photo', this.photo);
    fd.append('employee_corresponding_address', data.address);
    fd.append('email', data.email);
    fd.append('employee_permanent_address', data.perm_address);
    fd.append('group', group);
    fd.append('password', data.password);
    fd.append('password2', data.password);
    fd.append('username', data.username);
    this.http.add_user(fd).subscribe(data => {
      console.log(data);
    })
  }
}
