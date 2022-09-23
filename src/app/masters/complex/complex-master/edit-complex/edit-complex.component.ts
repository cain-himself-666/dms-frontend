import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-edit-complex',
  templateUrl: './edit-complex.component.html',
  styleUrls: ['./edit-complex.component.css']
})
export class EditComplexComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  @Input('cName') complex_name: any;
  @Input('cDescp') complex_description: any;
  @Input('cId') complex_id: any;
  c_name: string = '';
  c_descp: string = '';
  c_id: string = '';
  showUpdateSuccess: boolean = false;
  notifier = new Subject();
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.c_name = this.complex_name;
    this.c_descp = this.complex_description;
    this.c_id = this.complex_id;
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
  onUpdate(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('complex_name', this.c_name);
      fd.append('complex_description', this.c_descp);
      fd.append('id', this.c_id);
      this.http.update_complex(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showUpdateSuccess = true;
      })
    }
  }
}
