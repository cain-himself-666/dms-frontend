import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
@Component({
  selector: 'app-designation-allocation',
  templateUrl: './designation-allocation.component.html',
  styleUrls: ['./designation-allocation.component.css']
})
export class DesignationAllocationComponent implements OnInit {
  emp_type: string = '';
  emp_name: string = '';
  emp_id: string = '';
  keyword: string = 'name';
  searchData:any;
  buffer: any = [];
  designations: any = [];
  id:string = '';
  showSuccess: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get_designations().subscribe(data => {
      this.designations = data.results;
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
      this.emp_id = data.related_profile.employee_id;
      this.emp_type = data.related_profile.employee_type;
      this.emp_name = data.related_profile.employee_name;
    })
  }
  onAllocateDesignation(desg:string){
    if(!this.searchData){
      alert('Please search for an employee');
    }
    else if(desg === '0'){
      alert('Please select a designation for the employee');
    }
    else{
      let fd = new FormData();
      fd.append('employee_id', this.id);
      fd.append('designation_id', desg);
      this.http.allocate_designation(fd).subscribe(data => {
        this.showSuccess = true;
      })
    }
  }
}
