import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-approve-cases',
  templateUrl: './approve-cases.component.html',
  styleUrls: ['./approve-cases.component.css']
})
export class ApproveCasesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.onGetCases();
  }
  onShowDetails(id:string){
    this.showApprove = false;
    this.case_id = id;
    this.http.get_old_case(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.case_no = data.case_no || 'N/A';
      this.judge_date = data.disposal_date || 'N/A';
      this.reg_date = data.registration_date || 'N/A';
      this.judges = data.judge_name.replace('|',',') || 'N/A';
      this.f_p_name = data.first_petitioner || 'N/A';
      this.f_r_name = data.first_respondent || 'N/A';
      this.a_p_name = data.additional_petitioner || 'N/A';
      this.a_r_name = data.additional_respondent || 'N/A';
      this.district = data.district || 'N/A';
      this.p_counsels = data.petitioner_counsel.replace('|',',');
      this.r_counsels = data.respondent_counsel.replace('|',',');
      this.documents = data.related_documents;
      this.b_code = data.disposal_bench_code;
      if(this.documents.length === 0){
        this.showDocuments = false;
      }
    })
    this.showDetails = !this.showDetails;
    this.showDocuments = true;
  }
  onApprove(event:any){
    if(event.target.checked){
      this.approve = true;
    }
    else{
      this.approve = false;
    }
  }
  onHideDetails(){
    this.showDetails = !this.showDetails;
    this.showApprove = false;
    this.remarks = '';
    this.onGetCases();
  }
  onGetCases(){
    this.http.get_old_cases().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.old_cases = data.results;
        this.showData = true;
      }
    })
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
}
