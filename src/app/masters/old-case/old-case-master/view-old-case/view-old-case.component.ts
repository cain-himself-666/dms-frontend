import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';  
import { OldCase } from '../old-case-model';
@Component({
  selector: 'app-view-old-case',
  templateUrl: './view-old-case.component.html',
  styleUrls: ['./view-old-case.component.css']
})
export class ViewOldCaseComponent implements OnInit {
  @Output('displayAddOldCase') onAddCase: any = new EventEmitter<{status: boolean}>();
  @Output('displayEditOldCase') onEditCase: any = new EventEmitter<{status: boolean}>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showData: boolean = false;
  old_cases: any = [];
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.getOldCases();
  }
  getOldCases(){
    this.http.get_old_cases().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.old_cases = data.results;
      }
    })
  }
  onShowAddCase(){
    this.onAddCase.emit({
      status: true
    })
  }
  onShowEditCase(id:string){
    this.http.get_old_case(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      let fetchedData = new OldCase(
        data.case_no, data.disposal_date, data.registration_date,
        data.disposal_bench_code, data.petitioner_counsel, data.respondent_counsel,
        data.first_petitioner, data.first_respondent, data.judge_name, data.additional_petitioner,
        data.additional_respondent, data.id, data.district
      )
      this.onEditCase.emit({
        status: true,
        oldCase: fetchedData,
        documents: data.related_documents
      })
    });
  }
}
