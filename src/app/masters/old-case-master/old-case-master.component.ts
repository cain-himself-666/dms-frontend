import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
declare var bindStepper: any;
@Component({
  selector: 'app-old-case-master',
  templateUrl: './old-case-master.component.html',
  styleUrls: ['./old-case-master.component.css']
})
export class OldCaseMasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  old_cases: any = [];
  additional_petitioner:any = [];
  additional_respondent:any = [];
  petitioner_counsels:Array<string> = [];
  respondent_counsels:Array<string> = [];
  documents: any = [];
  judges:any = [];
  doc_type:any = [];
  pcounsel_name: string = '';
  rcounsel_name: string = '';
  judge_name:string = '';
  app_id: number = 0;
  doc: any;
  showData: boolean = false;
  showForm: boolean = false;
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
  showDocGrid:boolean = false;
  id: number = 0;
  showAddSuccess: boolean = false;
  showUpdateSuccess: boolean = false;
  constructor(private http: HttpService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    bindStepper();
    this.http.document_type().subscribe(data => {
      this.doc_type = data.results
    })
    this.getOldCases();
  }
  onShowEntryForm(){
    this.showForm = true;
  }
  onShowForm(id:string){
    this.showForm = true;
    this.id = 1;
    this.http.get_old_case(id).subscribe(data => {
      console.log(data);
      this.petitioner_counsels = data.petitioner_counsel.split('|');
      this.respondent_counsels = data.respondent_counsel.split('|');
      this.additional_petitioner = data.additional_petitioner.split('|');
      this.additional_respondent = data.additional_respondent.split('|');
      this.judges = data.judge_name.split('|');
      this.case_number = data.case_no;
      this.registration_date = data.registration_date;
      this.disposal_date = data.disposal_date;
      this.f_p_name = data.first_petitioner;
      this.f_r_name = data.first_respondent;
      this.b_code = data.disposal_bench_code;
      this.case_district = data.district;
      this.documents = data.related_documents;
      this.app_id = data.id;
      if(this.documents.length !== 0){
        this.showDocGrid = true;
      }
      if(data.additional_petitioner !== ''){
        this.additional_petitioner = data.additional_petitioner.split('|');
      }
      if(data.additional_respondent !== ''){
        this.additional_respondent = data.additional_respondent.split('|');
      }
    })
  }
  onHideForm(){
    this.showForm = false;
    this.id = 0;
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
    this.getOldCases();
    document.getElementById('save')?.removeAttribute('disabled');
  }
  onDeleteDocument(id:string){
    this.http.delete_document(id).subscribe(data => {
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
        let case_id: any = this.app_id
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
        if(this.id === 0){
          this.http.case_entry(fd).subscribe(data => {
            this.app_id = data.id
            document.getElementById('save')?.setAttribute('disabled','');
            this.showAddSuccess = true;
          })
        }
        else{
          console.log(additional_petitioner);
          this.http.update_case(fd, case_id).subscribe(data => {
            this.showUpdateSuccess = true;
            document.getElementById('save')?.setAttribute('disabled','');
          });
        }
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
      this.http.add_document(fd).subscribe(data => {
        this.showDocGrid = true;
        this.getDocuments();
        this.doc_type_field = '0';
        this.file_upload = '';
      })
    }
  }
  getDocuments(){
    this.http.get_documents(this.app_id).subscribe(data => {
      if(data.count === 0){
        this.showDocGrid = false;
      }
      else{
        this.documents = data.results;
        this.showDocGrid = true;
      }
    });
  }
  getOldCases(){
    this.http.get_old_cases().subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.old_cases = data.results;
      }
    })
  }
  onHideAlerts(){
    this.showAddSuccess = false;
    this.showUpdateSuccess = false;
  }
}
