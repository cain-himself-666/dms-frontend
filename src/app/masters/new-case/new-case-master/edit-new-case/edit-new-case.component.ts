import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
declare var bindStepper: any;
@Component({
  selector: 'app-edit-new-case',
  templateUrl: './edit-new-case.component.html',
  styleUrls: ['./edit-new-case.component.css']
})
export class EditNewCaseComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  @Input() id:any;
  doc: any;
  doc_type: any = [];
  doc_type_field: string = '0';
  app_id: number = 0;
  showDocGrid: boolean = false;
  file_upload: string = '';
  documents: any = [];
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
  notifier = new Subject;
  progressValue: number =0;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    bindStepper();
    this.http.get_new_case_details(this.id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.onGetDocTypes();
      this.app_id = data.id;
      this.case_no = data.case_no;
      this.b_code = data.disposal_bench_code;
      this.f_p_name = data.first_petitioner;
      this.f_r_name = data.first_respondent;
      this.p_counsels = data.petitioner_counsel;
      this.r_counsels = data.respondent_counsel;
      this.a_p_name = data.additional_petitioner;
      this.a_r_name = data.additional_respondent;
      this.judges = data.judge_name;
      this.judge_date = data.disposal_date;
      this.reg_date = data.registration_date;
      this.documents = data.related_documents;
      if(this.documents.length <= 0){
        this.showDocGrid = false;
      }
      else{
        this.showDocGrid = true;
      }
    })
  }
  onGetDocTypes(){
    this.http.document_type().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.doc_type = data.results
    })
  }
  onDeleteDocument(id:string){
    this.http.delete_new_case_document(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDocuments();
    });
  }
  getDocuments(){
    this.http.get_new_case_documents(this.app_id).pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showDocGrid = false;
      }
      else{
        this.documents = data.results;
        this.showDocGrid = true;
      }
    });
  }
  onUploadDocuments(doc_type:string){
    if(doc_type === '0'){
      alert('Please select the document type');
    }
    else if(!this.doc){
      alert('Please select the file to be uploaded');
    }
    else{
      let fd = new FormData();
      fd.append('case_id', this.app_id.toString());
      fd.append('type_id', doc_type);
      fd.append('document_url', this.doc);
      this.http.add_new_case_document(fd).pipe(map(events => {
        switch(events.type){
          case HttpEventType.UploadProgress:
            this.progressValue = Math.round(events.loaded/events.total! * 100);
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              this.progressValue = 0;
            },250)
        }
      })).subscribe(data => {
        if(this.progressValue !== 100){}
        else{
          this.showDocGrid = true;
          this.getDocuments();
          this.doc_type_field = '0';
          this.file_upload = '';
        }
      })
    }
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
