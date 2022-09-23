import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.css']
})
export class AddDocumentTypeComponent{
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  showDocSuccess: boolean = false;
  notifier = new Subject();
  constructor(private http: HttpService) { }
  onAddDocumentType(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('name', data.value.doc_type);
      this.http.add_document_type(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showDocSuccess = true;
      })
    }
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
}
