import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrls: ['./edit-cases.component.css']
})
export class EditCasesComponent implements OnInit {
  @Output('hide') onHide:any = new EventEmitter<{ status: boolean}>();
  @Input('cases') case_details: any;
  @Input('documents') case_documents: any; 
  showDocuments: boolean = false;
  showDetails: boolean = false;
  showData: boolean = false;
  case_id: string = '';
  old_cases: any = [];
  case_no: string = '';
  reg_date: string = '';
  judge_date: string = '';
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
  approve: any = false;
  documents: any = [];
  showApprove: boolean = false;
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.case_no = this.case_details.case_no;
    this.reg_date = this.case_details.registration_date;
    this.judge_date = this.case_details.disposal_date;
    this.f_p_name = this.case_details.petitioner_name;
    this.f_r_name = this.case_details.respondent_name;
    this.district = this.case_details.district;
    this.p_counsels = this.case_details.petitioner_counsels.replace('|',',');
    this.r_counsels = this.case_details.respondent_counsels.replace('|',',');
    this.b_code = this.case_details.bench_code;
    this.judges = this.case_details.judges.replace('|',',');
    this.documents = this.case_documents;
    this.case_id = this.case_details.id;
    if(this.documents.length !== 0){
      this.showDocuments = true;
    }
  }
  onApprove(event:any){
    if(event.target.checked){
      this.approve = true;
    }
    else{
      this.approve = false;
    }
  }
  onApproveCase(data: any){
    if(this.approve === false){
      alert('Please approve the case before proceeding');
    }
    else{
      let fd = new FormData();
      fd.append('id', this.case_id);
      fd.append('remarks', data);
      fd.append('is_approved', this.approve);
      this.http.approve_case(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showApprove = true;
      })
    }
  }
  onHideForm(){
    this.onHide.emit({
      status: true
    })
  }
}
