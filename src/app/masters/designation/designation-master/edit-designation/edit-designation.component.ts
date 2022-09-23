import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  @Input('dName') desg_name: string = '';
  @Input('dDescp') desg_descp: string = '';
  @Input('dGroup') desg_group: string = '';
  @Input('dId') desg_id: string = '';
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  d_name: string = '';
  d_descp: string = '';
  d_group: string = '0';
  d_id: string = '';
  showUpdateSuccess: boolean = false;
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.d_name = this.desg_name;
    this.d_id = this.desg_id;
    this.d_group = this.desg_group;
    this.d_descp = this.desg_descp;
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
      if(data.value.d_group === '0'){
        alert('Please select a group for Designation');
      }
      else{
        let fd = new FormData();
        fd.append('designation_name', data.value.desg_name);
        fd.append('designation_description', data.value.desg_descp);
        fd.append('designation_group', data.value.group);
        fd.append('id', this.d_id);
        this.http.update_designation(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
          this.showUpdateSuccess = true;
        })
      }
    }
  }
}
