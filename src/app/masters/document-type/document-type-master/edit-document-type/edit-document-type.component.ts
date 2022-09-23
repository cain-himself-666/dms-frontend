import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.css']
})
export class EditDocumentTypeComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  @Input() doc_type_name: string = '';
  @Input() doc_type_id: string = '';
  d_name: string = '';
  d_id: string = '';
  notifier = new Subject();
  showDocUpdate: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.d_name = this.doc_type_name;
    this.d_id = this.doc_type_id;
  }
  onUpdate(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('name', this.d_name); 
      fd.append('id', this.d_id);
      this.http.update_document_type(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showDocUpdate = true;
      })
    }
  }
  onHideForm(){
    this.onHide.emit({
      status: true,
    })
  }
}
