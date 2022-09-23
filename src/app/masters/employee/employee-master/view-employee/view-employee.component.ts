import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Employee } from '../employee-model';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  @Output() displayAddEmployee:any = new EventEmitter<{status: boolean}>();
  @Output() displayEditEmployee:any = new EventEmitter<{status: boolean}>();
  emp!: Employee;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showData: boolean = false;
  users: any = [];
  notifier = new Subject();
  id:string = '';
  profile_id: string = '';
  imgSrc: any;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.getUser();
  }
  onViewAddEmployee(){
    this.displayAddEmployee.emit({
      status: true
    })
  }
  onViewEditEmployee(id:string){
    this.http.get_user(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.related_profile.employee_photo === null){
        this.imgSrc = 'assets/images/dummy.jpeg';
      }
      else{
        this.imgSrc = data.related_profile.employee_photo;
      }
      let e = new Employee(data.related_profile.employee_name,
        data.related_profile.employee_contact,
        data.related_profile.employee_gender,
        data.related_profile.employee_blood_group,
        data.related_profile.employee_date_of_birth,
        data.email,
        data.related_profile.employee_corresponding_address,
        data.related_profile.employee_permanent_address,
        data.related_profile.employee_id,
        data.related_profile.employee_type,
        data.related_groups[0].id,
        data.username,
        this.imgSrc);
      this.id = data.id;
      this.profile_id = data.related_profile.id;
      this.displayEditEmployee.emit({
        status: true,
        employee: e,
        id: this.id,
        profile_id: this.profile_id,
      })
    });
  }
  getUser(){
    this.http.get_users().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.users = data.results;
      }
    })
  }
  isDelete(id:string, is_delete: boolean){
    let i:any;
    if(is_delete){
      i = false;
    }
    else{
      i=true;
    }
    let fd = new FormData();
    fd.append('employee_isDeleted', i);
    fd.append('id', id);
    this.http.update_user_isDelete(fd).pipe(takeUntil(this.notifier)).subscribe(data =>{
      this.getUser();
    })
  }
}
