import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';  
@Component({
  selector: 'app-view-new-case',
  templateUrl: './view-new-case.component.html',
  styleUrls: ['./view-new-case.component.css']
})
export class ViewNewCaseComponent implements OnInit {
  @Output('addNewCase') addNew: any = new EventEmitter<{status: boolean}>();
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
    this.getNewCases();
  }
  getNewCases(){
    this.http.get_new_cases().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.count === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.old_cases = data.results;
      }
    })
  }
  onAddNewCase(){
    this.addNew.emit({
      status: true
    })
  }
}
