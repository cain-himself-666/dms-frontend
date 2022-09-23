import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  notifier = new Subject();
  d_name: string = '';
  d_descp: string = '';
  complexes: any = [];
  complex_id: string = '0';
  showAddSuccess: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get_complex().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.complexes = data.results;
    })
  }
  onSubmitDept(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(data.value.complex === '0'){
        alert('Please select a complex')
      }
      else{
        let fd = new FormData(); 
        fd.append('department_name', data.value.dept_name);
        fd.append('department_description', data.value.dept_descp);
        fd.append('department_complex', data.value.complex);
        this.http.add_department(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
          this.showAddSuccess = true;
        })
      }
    }
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
}
