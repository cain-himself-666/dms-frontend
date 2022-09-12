import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css']
})
export class DepartmentMasterComponent implements OnInit {
  d_id:any;
  d_name: string = '';
  d_descp: string = '';
  complex_name: string = '';
  complexes: any = [];
  departments: any = [];
  showData: boolean = false;
  showForm: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get_complex().subscribe(data => {
      this.complexes = data.results;
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.http.get_departments().subscribe(data => {
      if(data.results.length === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.departments = data.results;
      }
    })
  }
  onSubmitDept(data:any, complex_id:string){
    let fd = new FormData();
    if(!this.d_id){
      fd.append('department_name', data.dept_name);
      fd.append('department_description', data.dept_descp);
      fd.append('department_complex', complex_id);
      this.http.add_department(fd).subscribe(data => {
        console.log(data);
      })
    }
    else{
      fd.append('department_name', data.dept_name);
      fd.append('department_description', data.dept_descp);
      fd.append('department_complex', complex_id);
      fd.append('id', this.d_id);
      this.http.update_department(fd).subscribe(data => {
        console.log(data);
      })
    }
  }
  onShowForm(id: number){
    this.d_id = id;
    this.showForm = !this.showForm;
    this.http.get_department(id).subscribe(data => {
      this.d_name = data.department_name;
      this.d_descp = data.department_description;
      this.complex_name = data.department_complex;
    })
  }
  onShowEntryForm(){
    this.showForm = !this.showForm;
    this.d_name = '';
    this.d_descp = '';
    this.complex_name = '0';
  }
  onHideForm(){
    this.showForm = !this.showForm;
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
    this.http.update_department_isDelete(fd).subscribe(data => {
      console.log(data);
    })
  }
}
