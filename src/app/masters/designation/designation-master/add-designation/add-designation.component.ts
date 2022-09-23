import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent{
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  showAddSuccess: boolean = false;
  notifier = new Subject();
  d_group: string = '0';
  constructor(private http: HttpService){}
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
  onSubmitDesg(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('designation_name', data.value.desg_name);
      fd.append('designation_description', data.value.desg_descp);
      fd.append('designation_group', data.value.group);
      this.http.add_designation(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showAddSuccess = true;
      })
    }
  }
}
