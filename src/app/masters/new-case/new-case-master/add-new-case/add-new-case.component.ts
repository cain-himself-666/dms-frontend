import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
declare var bindStepper: any;
@Component({
  selector: 'app-add-new-case',
  templateUrl: './add-new-case.component.html',
  styleUrls: ['./add-new-case.component.css']
})
export class AddNewCaseComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  notifier = new Subject();
  years: any = [];
  case_types:any = [];
  showDetails: boolean = false;
  showError: boolean = false;
  caseType: string = '0';
  caseYear: string = '2015';
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
  constructor(private http: HttpService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    let year = parseInt(this.onGetYears());
    for(var i=15;i<year+1;i++){
      this.years.push('20'+i);
    }
    this.onGetCaseTypes();
    bindStepper();
  }
  onGetYears(){
    let date = new Date();
    var year = date.getFullYear().toString();
    year = year.slice(-2);
    return year;
  }
  onGetCaseTypes(){
    this.http.get_case_types().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.case_types = data.results;
    })
  }
  onDeleteDocument(id:string){
    this.http.delete_document(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDocuments();
    });
  }
  onGetCaseDetails(data:any){
    let fd = new FormData();
    fd.append('case_number', data.value.case_number);
    fd.append('case_type', data.value.case_type);
    fd.append('case_year', data.value.case_year);
    this.http.get_case_details(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showError = true;
        this.showDetails = false;
      }
      else{
        this.case_no = data.results[0].related_case_type.type_name+'/'+fd.get('case_number')+'/'+fd.get('case_year');
        this.reg_date = this.datePipe.transform(data.results[0].date_of_filing, 'dd-MM-YYYY');
        this.judge_date = this.datePipe.transform(data.results[0].date_of_decision, 'dd-MM-YYYY');
        this.f_p_name = data.results[0].pet_name;
        this.f_r_name = data.results[0].res_name;
        this.p_counsels = data.results[0].pet_adv;
        this.r_counsels = data.results[0].res_adv;
        this.b_code = data.results[0].judge_code;
        console.log(data);
        this.onGetDocTypes();
        this.showDetails = true;
        this.showError = false;
      }
    })
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
  onAddStep2(doc_type:string){
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
      this.http.add_document(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showDocGrid = true;
        this.getDocuments();
        this.doc_type_field = '0';
        this.file_upload = '';
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
  onGetDocTypes(){
    this.http.document_type().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.doc_type = data.results
    })
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
}
