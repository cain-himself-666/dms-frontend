import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  @Output('hide') onHide:any = new EventEmitter<{status: boolean}>();
  @Input('dName') dept_name: string = '';
  @Input('dDescp') dept_descp: string = '';
  @Input('dId') dept_id: string = '';
  @Input('dComplex') dept_complex: string = '';
  d_name: string = '';
  d_descp: string = '';
  d_id: string = '';
  showUpdateSuccess: boolean = false;
  complex_name: string = '0';
  notifier = new Subject();
  complexes: any = [];
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.http.get_complex().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.complexes = data.results;
    });
    this.d_name = this.dept_name;
    this.d_descp = this.dept_descp;
    this.d_id = this.dept_id;
    this.complex_name = this.dept_complex;
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
  onUpdate(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(this.complex_name === '0'){
        alert('Please select a complex for department');
      }
      else{
        let fd = new FormData();
        fd.append('department_name', this.d_name);
        fd.append('department_description', this.d_descp);
        fd.append('department_complex', this.complex_name);
        fd.append('id', this.d_id);
        this.http.update_department(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
          this.showUpdateSuccess = true;
        })
      }
    }
  }
}
