import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-document-type-master',
  templateUrl: './document-type-master.component.html',
  styleUrls: ['./document-type-master.component.css']
})
export class DocumentTypeMasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showGrid: boolean = false;
  showForm: boolean = false;
  d_type: string = '';
  d_id: string = '';
  doc_types: any = [];
  buffer: number = 0;
  showDocSuccess: boolean = false;
  showDocUpdate: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.onGetDocumentType();
  }
  onShowEntryForm(){
    this.showDocSuccess = false;
    this.showDocUpdate = false;
    this.showForm = !this.showForm;
  }
  onShowForm(id:any){
    this.d_id = id;
    this.showDocSuccess = false;
    this.showDocUpdate = false;
    this.showForm = !this.showForm;
    this.buffer = 1;
    this.http.get_document_type(id).subscribe(data => {
      this.d_type = data.name;
    })
  }
  onHideForm(){
    this.showForm = !this.showForm;
    this.showDocSuccess = false;
    this.onGetDocumentType();
    this.buffer = 0;
  }
  onAddDocumentType(doc:any){
    if(!doc.valid){
      doc.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('name', this.d_type);
      if(this.buffer === 0){
        this.http.add_document_type(fd).subscribe(data => {
          this.showDocSuccess = true;
          this.showDocUpdate = false;
        })
      }
      else{
        fd.append('id', this.d_id);
        this.http.update_document_type(fd).subscribe(data => {
          this.showDocUpdate = true;
          this.showDocSuccess = false;
          this.d_type = '';
        })
      }
    }
  }
  onGetDocumentType(){
    this.http.document_type().subscribe(data => {
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
