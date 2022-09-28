import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var bindStepper: any;
@Component({
  selector: 'app-edit-new-case',
  templateUrl: './edit-new-case.component.html',
  styleUrls: ['./edit-new-case.component.css']
})
export class EditNewCaseComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  doc: any;
  doc_type: any = [];
  doc_type_field: string = '0';
  app_id: number = 0;
  showDocGrid: boolean = false;
  file_upload: string = '';
  documents: any = [];
  case_id: string = '';
  case_no: string = '';
  reg_date: any;
  judge_date: any;
  b_code: string = '';
  judges: string = '';
  district: string = '';
  f_p_name: string = '';
  f_r_name: string = '';
  a_p_name: string = '';
  a_r_name: string = '';
  p_counsels: string = '';
  r_counsels: string = '';
  remarks: string = '';
  notifier = new Subject;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }
  onDeleteDocument(id:string){
    this.http.delete_document(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDocuments();
    });
  }
  getDocuments(){
    this.http.get_documents(this.app_id).pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showDocGrid = false;
      }
      else{
        this.documents = data.results;
        this.showDocGrid = true;
      }
    });
  }
  onFileUpload(event:any){
    let fileSize =  event.target.files[0].size/1000000;
    if(fileSize > 200){
      alert(`File Size Exceeds (Max File Size Accepted: 200 MB)`);
      this.file_upload = '';
    }
    else{
      this.doc = event.target.files[0];
    }
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
}
