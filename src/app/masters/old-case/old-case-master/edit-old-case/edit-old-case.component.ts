import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
declare var bindStepper: any;  

@Component({
  selector: 'app-edit-old-case',
  templateUrl: './edit-old-case.component.html',
  styleUrls: ['./edit-old-case.component.css']
})
export class EditOldCaseComponent implements OnInit {
  @Output('hide') onHide: any = new EventEmitter<{status: boolean}>();
  @Input() oldCases: any;
  @Input() caseDocuments: any;
  additional_petitioner:Array<string> = [];
  additional_respondent:Array<string> = [];
  petitioner_counsels:Array<string> = [];
  respondent_counsels:Array<string> = [];
  documents: any = [];
  judges:any = [];
  doc_type:any = [];
  pcounsel_name: string = '';
  rcounsel_name: string = '';
  judge_name:string = '';
  app_id: string = '';
  doc: any;
  doc_type_field: string = '0';
  file_upload: string = '';
  case_number: string = '';
  registration_date: string = '';
  disposal_date: string = '';
  f_p_name: string = '';
  f_r_name: string = '';
  case_district: string = '';
  a_p_name: string = '';
  a_r_name: string = '';
  b_code: string = '';
  notifier = new Subject();
  showUpdateSuccess: boolean = false;
  showDocGrid: boolean = false;
  progressValue: number = 0;
  constructor(private http: HttpService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.http.document_type().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.doc_type = data.results
    })
    bindStepper();
    this.case_number = this.oldCases.case_no;
    this.registration_date = this.oldCases.registration_date;
    this.disposal_date = this.oldCases.disposal_date;
    this.f_p_name = this.oldCases.petitioner_name;
    this.f_r_name = this.oldCases.respondent_name;
    this.case_district = this.oldCases.district;
    this.petitioner_counsels = this.oldCases.petitioner_counsels.split('|');
    this.respondent_counsels = this.oldCases.respondent_counsels.split('|');
    this.b_code = this.oldCases.bench_code;
    this.judges = this.oldCases.judges.split('|');
    this.documents = this.caseDocuments;
    this.app_id = this.oldCases.id;
    if(this.oldCases.additional_petitioners){
      this.additional_petitioner = this.oldCases.additional_petitioners.split('|');
    } 
    if(this.oldCases.additional_respondents){
      this.additional_respondent = this.oldCases.additional_respondents.split('|');
    }
    if(this.documents.length !== 0){
      this.showDocGrid = true;
    }
  }
  onDeleteDocument(id:string){
    this.http.delete_document(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDocuments();
    });
  }
  onAddPetitionerCounsel(){
    if(this.pcounsel_name === ''){
      alert('Please enter petitioner counsel name');
    }
    else{
      this.petitioner_counsels.push(this.pcounsel_name);
      this.pcounsel_name = '';
    }
  }
  onAddRespondentCounsel(){
    if(this.rcounsel_name === ''){
      alert('Please enter respondent counsel name');
    }
    else{
      this.respondent_counsels.push(this.rcounsel_name);
      this.rcounsel_name = '';
    }
  }
  onDeletePetCounsel(counsel_name: string){
    this.petitioner_counsels.splice(this.petitioner_counsels.findIndex((item: string) => item === counsel_name),1);
  }
  onDeleteResCounsel(counsel_name: string){
    this.respondent_counsels.splice(this.respondent_counsels.findIndex((item: string) => item === counsel_name),1);
  }
  onAddAddnPetitioner(){
    if(this.a_p_name === ''){
      alert('Please enter additional petitioner name');
    }
    else{
      this.additional_petitioner.push(this.a_p_name);
      this.a_p_name = '';
    }
    console.log(this.additional_petitioner);
  }
  onAddAddnRespondent(){
    if(this.a_r_name === ''){
      alert('Please enter additional respondent name');
    }
    else{
      this.additional_respondent.push(this.a_r_name);
      this.a_r_name = '';
    }
  }
  onDeleteAddnPetitioner(addn_pet_name: string){
    this.additional_petitioner.splice(this.additional_petitioner.findIndex((item: string) => item === addn_pet_name),1);
  }
  onDeleteAddnRespondent(addn_res_name: string){
    this.additional_respondent.splice(this.additional_respondent.findIndex((item: string) => item === addn_res_name),1);
    console.log(this.additional_respondent);
  }
  onAddJudges(){
    if(this.judge_name === ''){
      alert('Please enter judge name');
    }
    else{
      this.judges.push(this.judge_name);
      this.judge_name = '';
    }
  }
  onDeleteJudge(judge_name: string){
    this.judges.splice(this.judges.findIndex((item: string) => item === judge_name),1);
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
  onAddStep1(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(this.petitioner_counsels.length === 0 || this.respondent_counsels.length === 0){
        if (this.petitioner_counsels.length === 0){
          alert('Please add atleast one petitioner counsel');
        }
        if (this.respondent_counsels.length === 0){
          alert('Please add atleast one respondent counsel');
        }
      }
      else if(this.judges.length === 0){
        alert('Please add atleast one judge');
      }
      else{
        var petitioner_counsel = this.petitioner_counsels.toString().replace(/,/g,'|');
        var respondent_counsel = this.respondent_counsels.toString().replace(/,/g,'|');
        var additional_respondent = this.additional_respondent.toString().replace(/,/g,'|');
        var additional_petitioner = this.additional_petitioner.toString().replace(/,/g,'|');
        let fd = new FormData();
        let init_year: any = this.datePipe.transform(data.value.reg_date, 'YYYY');
        fd.append('case_no', data.value.case_no);
        fd.append('disposal_date', data.value.disp_date);
        fd.append('first_petitioner', data.value.first_petitioner);
        fd.append('first_respondent', data.value.first_respondent);
        fd.append('district', data.value.district);
        fd.append('registration_date', data.value.reg_date);
        fd.append('case_year', init_year);
        fd.append('petitioner_counsel', petitioner_counsel);
        fd.append('respondent_counsel', respondent_counsel);
        fd.append('disposal_bench_code', data.value.bench_code);
        fd.append('additional_petitioner', additional_petitioner);
        fd.append('additional_respondent', additional_respondent);
        fd.append('judge_name', this.judges.toString().replace(',','|'));
        this.http.update_case(fd, this.app_id).pipe(takeUntil(this.notifier)).subscribe(data => {
          this.showUpdateSuccess = true;
          document.getElementById('save')?.setAttribute('disabled','');
        });
      }
    }
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
      this.http.add_document(fd).pipe(map(events => {
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
        if(this.progressValue !==100){

        }
        else{
          this.showDocGrid = true;
          this.getDocuments();
          this.doc_type_field = '0';
          this.file_upload = '';
        }
      })
    }
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
  onHideForm(){
    this.onHide.emit({
      status: true,
    })
    this.showUpdateSuccess = false;
  }
}
