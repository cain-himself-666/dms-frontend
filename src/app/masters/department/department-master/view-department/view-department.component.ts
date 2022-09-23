import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  @Output('displayAddDept') showAddDept: any = new EventEmitter<{status: boolean}>();
  @Output('displayEditDept') showEditDept: any = new EventEmitter<{status: boolean}>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  departments: any = [];
  complexes: any = [];
  showData: boolean = false;
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.getDepartment();
  }
  onViewAddDept(){
    this.showAddDept.emit({
      status: true
    })
  }
  onViewEditDept(id: number){
    this.http.get_department(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.showEditDept.emit({
        status: true,
        dept_name: data.department_name,
        dept_descp: data.department_description,
        dept_id: data.id,
        dept_complex: data.department_complex
      })
    })
  }
  getDepartment(){
    this.http.get_departments().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.results.length === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.departments = data.results;
      }
    })
  }
  isDelete(id:string, is_delete:boolean){
    let i:any;
    if(is_delete){
      i = false;
    }
    else{
      i = true;
    }
    let fd = new FormData();
    fd.append('id', id);
    fd.append('department_isDeleted', i);
    this.http.update_department_isDelete(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDepartment();
    })
  }
}
