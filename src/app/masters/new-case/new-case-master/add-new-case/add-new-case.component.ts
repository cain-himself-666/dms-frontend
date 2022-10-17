import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
declare var bindStepper: any;
@Component({
  selector: 'app-add-new-case',
  templateUrl: './add-new-case.component.html',
  styleUrls: ['./add-new-case.component.css']
})
export class AddNewCaseComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  notifier = new Subject();
  showSuccess: boolean = false;
  pet: any = [];
  res: any = [];
  a_pet: any = [];
  a_res:any = [];
  years: any = [];
  case_types:any = [];
  showDetails: boolean = false;
  showError: boolean = false;
  showErr:boolean = false;
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
  buffer: Array<string> = [];
  progressValue: number = 0;
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
    this.http.delete_new_case_document(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDocuments();
    });
  }
  onGetCaseDetails(data:any){
    this.case_no = '';this.a_p_name = ''; this.reg_date='';this.judge_date = '';this.f_p_name='';this.f_r_name='';this.b_code='';
    this.judges='';this.a_p_name='';this.a_r_name='';this.p_counsels='';this.r_counsels='';
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
        this.onGetDocTypes();
        this.case_no = data.results[0].related_case_type.type_name+'/'+fd.get('case_number')+'/'+fd.get('case_year');
        this.reg_date = this.datePipe.transform(data.results[0].date_of_filing, 'YYYY-MM-dd');
        this.judge_date = this.datePipe.transform(data.results[0].date_of_decision, 'YYYY-MM-dd');
        this.f_p_name = data.results[0].pet_name;
        this.f_r_name = data.results[0].res_name;
        this.b_code = data.results[0].judge_code;
        this.showDetails = true;
        this.showError = false;
        this.http.get_judges(data.results[0].judge_code).pipe(takeUntil(this.notifier)).subscribe(data => {
          data.results.forEach((judges:any) => {
            this.buffer.push(judges.judge_name);
          })
          this.judges = this.buffer.toString();
        })
        this.http.get_extra_advocates(data.results[0].cino).pipe(takeUntil(this.notifier)).subscribe(data => {
          data.results.forEach((counsels:any) => {
            if(counsels.type === 2){
              this.res.push(counsels.adv_name);
            }
            else{
              this.pet.push(counsels.adv_name);
            }
          })
          this.p_counsels = this.pet.toString();
          this.r_counsels = this.res.toString();
        })
        this.http.get_extra_parties(data.results[0].cino).pipe(takeUntil(this.notifier)).subscribe(data => {
          data.results.forEach((addn:any) => {
            if(addn.type === 2){
              this.a_res.push(addn.name);
            }
            else{
              this.a_pet.push(addn.name);
            }
          })
          this.a_p_name = this.a_pet.toString();
          this.a_r_name = this.a_res.toString();
        })
      }
    })
    
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
  onAddStep1(){
    let init_year: any = this.reg_date.split('-')[0];
    let fd = new FormData();
    fd.append('case_no', this.case_no);
    fd.append('disposal_bench_code', this.b_code);
    fd.append('case_year', init_year);
    fd.append('judge_name', this.judges)
    fd.append('disposal_date', this.judge_date);
    fd.append('first_petitioner', this.f_p_name);
    fd.append('first_respondent', this.f_r_name);
    fd.append('registration_date', this.reg_date);
    fd.append('petitioner_counsel', this.p_counsels);
    fd.append('respondent_counsel', this.r_counsels);
    fd.append('additional_petitioner', this.a_p_name);
    fd.append('additional_respondent', this.a_r_name);
    this.http.add_new_case(fd).subscribe(data => {
      this.app_id = data.id;
      this.showSuccess = true;
      this.showErr = false;
    },err => {
      this.showErr = true;
      this.showSuccess = false;
    })

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
