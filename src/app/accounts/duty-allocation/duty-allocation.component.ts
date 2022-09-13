import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
@Component({
  selector: 'app-duty-allocation',
  templateUrl: './duty-allocation.component.html',
  styleUrls: ['./duty-allocation.component.css']
})
export class DutyAllocationComponent implements OnInit {
  emp_type: string = '';
  emp_name: string = '';
  emp_id: string = '';
  id: string = '';
  keyword: string = 'name';
  searchData:any;
  buffer: any = [];
  complex: any = [];
  department: any = [];
  showDept: boolean = false;
  complex_id: string = '';
  department_id:string = '';
  showSuccess: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get_complex().subscribe(data => {
      this.complex = data.results;
    })
    this.http.get_users().subscribe(data => {
      data.results.forEach((element:any) => {
        this.buffer.push({
          'id': element.id,
          'name': element.related_profile.employee_name,
        })
      });
    })
  }
  onChangeSearch(val: string) {
    if(val.length >=1){
      this.searchData = this.buffer;
    }
    else{
      this.searchData = [];
    }
  }
  onSearchUser(id:string){
    this.id = id;
    this.http.get_user(id).subscribe(data => {
      this.emp_id = data.related_profile[0].employee_id;
      this.emp_type = data.related_profile[0].employee_type;
      this.emp_name = data.related_profile[0].employee_name;
    })
  }
  onGetDepartments(event:any){
    this.complex_id = event.target.value;
    this.department_id = '';
    this.http.get_corresponding_department(event.target.value).subscribe(data => {
      if(data.count === 0){
        this.showDept = false;
      }
      else{
        this.showDept = true;
        this.department = data.results;
      }
    })
  }
  onGetDepartment(event:any){
    this.department_id = event.target.value;
  }
  onAllocateDuty(){
    let fd = new FormData();
    if(this.department_id){
      fd.append('department_id', this.complex_id);
    }
    fd.append('complex_id', this.complex_id);
    fd.append('employee_id', this.id);
    this.http.allocate_duty(fd).subscribe(data => {
      this.showSuccess = true
    })
  }
}
