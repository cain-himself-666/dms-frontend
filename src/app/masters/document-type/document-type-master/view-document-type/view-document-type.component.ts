import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-view-document-type',
  templateUrl: './view-document-type.component.html',
  styleUrls: ['./view-document-type.component.css']
})
export class ViewDocumentTypeComponent implements OnInit {
  @Output('displayAddDocType') onShowAddDocType: any = new EventEmitter<{status: boolean}>();
  @Output('displayEditDocType') onShowEditDocType: any = new EventEmitter<{status: boolean}>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showGrid: boolean = false;
  notifier = new Subject();
  doc_types: any = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.onGetDocumentType();
  }
  onViewAddDocType(){
    this.onShowAddDocType.emit({
      status: true
    })
  }
  onViewEditDocType(id:number){
    this.http.get_document_type(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.onShowEditDocType.emit({
        status: true,
        doc_type: data.name,
        doc_type_id: data.id
      })
    })
  }
  onGetDocumentType(){
    this.http.document_type().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showGrid = false;
      }
      else{
        this.showGrid = true;
        this.doc_types = data.results;
      }
    })
  }
}
