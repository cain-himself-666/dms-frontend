import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-complex',
  templateUrl: './add-complex.component.html',
  styleUrls: ['./add-complex.component.css']
})
export class AddComplexComponent implements OnInit {
  showAddSuccess: boolean = false;
  notifier = new Subject();
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
    this.showAddSuccess = false;
  }
  onSubmitComplex(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('complex_name', data.value.complex_name);
        fd.append('complex_description', data.value.complex_description);
        this.http.add_complex(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
          this.showAddSuccess = true;
      })
    }
  }
}
