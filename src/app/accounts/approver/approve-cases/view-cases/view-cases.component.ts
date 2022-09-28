import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OldCase } from 'src/app/masters/old-case/old-case-master/old-case-model';
@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.css']
})
export class ViewCasesComponent implements OnInit {
  @Output('displayEditCases') onShowEditCases: any = new EventEmitter<{ status: boolean }>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  notifier = new Subject();
  showData: boolean = false;
  old_cases: any = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
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
  onShowEdit(id:string){
    this.http.get_old_case(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      let fetchedData = new OldCase(
        data.case_no, data.disposal_date, data.registration_date,
        data.disposal_bench_code, data.petitioner_counsel, data.respondent_counsel,
        data.first_petitioner, data.first_respondent, data.judge_name, data.additional_petitioner,
        data.additional_respondent, data.id, data.district
      )
      this.onShowEditCases.emit({
        status: true,
        case: fetchedData,
        documents: data.related_documents,
      })
    })
  }
}
