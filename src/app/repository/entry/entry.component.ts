import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { DatePipe } from '@angular/common';
declare var bindStepper: any;
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  
  petitioner_counsels:any = [];
  respondent_counsels:any = [];
  judges:any = [];
  pcounsel_name: string = '';
  rcounsel_name: string = '';
  judge_name:string = '';
  constructor(private http: HttpService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    bindStepper();
  }
  onAddJudge(){
    let jfield = document.createElement('div');
    jfield.className = 'mt-3';
    jfield.innerHTML = "<label class='form-label'>Judge Name</label><input type='text' class='form-control'>";
    document.getElementById('judge')?.appendChild(jfield);
  }
  onAddPetitionerCounsel(){
    this.petitioner_counsels.push(this.pcounsel_name);
    this.pcounsel_name = '';
  }
  onAddRespondentCounsel(){
    this.respondent_counsels.push(this.rcounsel_name);
    this.rcounsel_name = '';
  }
  onDeletePetCounsel(counsel_name: string){
    this.petitioner_counsels.splice(this.petitioner_counsels.findIndex((item: string) => item === counsel_name),1);
  }
  onDeleteResCounsel(counsel_name: string){
    this.respondent_counsels.splice(this.respondent_counsels.findIndex((item: string) => item === counsel_name),1);
  }
  onAddStep1(data:any){
    if(this.petitioner_counsels.length === 0 || this.respondent_counsels.length === 0){
      if (this.petitioner_counsels.length === 0){
        alert('Please add atleast one petitioner counsel');
      }
      if (this.respondent_counsels.length === 0){
        alert('Please add atleast one respondent counsel');
      }
    }
    else{
      var petitioner_counsel = this.petitioner_counsels.toString().replace(',','|');
      var respondent_counsel = this.respondent_counsels.toString().replace(',','|');
      let fd = new FormData();
      let init_year: any = this.datePipe.transform(data.filing_date, 'YYYY');
      fd.append('case_no', data.case_no);
      fd.append('disposal_date', data.disposal_date);
      fd.append('first_petitioner', data.first_petitioner);
      fd.append('first_respondent', data.first_respondent);
      fd.append('district', data.district);
      fd.append('filing_date', data.filing_date);
      fd.append('case_year', init_year);
      fd.append('petitioner_counsel', petitioner_counsel);
      fd.append('respondent_counsel', respondent_counsel);
      this.http.case_entry(fd).subscribe(data => {
        console.log(data);
      })
    }
  }
  onAddJudges(){
    this.judges.push(this.judge_name);
    this.judge_name = '';
  }
  onDeleteJudge(judge_name: string){
    this.judges.splice(this.judges.findIndex((item: string) => item === judge_name),1);
  }
  onAddStep2(data: any){
    if(this.judges.length === 0){
      alert('Please add atleast one judge to proceed.');
    }
    else{
      let fd = new FormData();
      fd.append('disposal_bench_code', data.bench_code);
      fd.append('additional_petitioner', data.addn_pet_name);
      fd.append('additional_respondent', data.addn_res_name);
      fd.append('judge_name', this.judges.toString().replace(',','|'));
      console.log(fd.get('disposal_bench_code'), fd.get('additional_petitioner'), fd.get('additional_respondent'), fd.get('judge_name'));
    }
  }
}
