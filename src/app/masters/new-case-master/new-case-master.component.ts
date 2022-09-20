import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/http/services/http.service';
declare var bindStepper: any;
@Component({
  selector: 'app-new-case-master',
  templateUrl: './new-case-master.component.html',
  styleUrls: ['./new-case-master.component.css']
})
export class NewCaseMasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showForm: boolean = false;
  showGrid: boolean = false;
  showOptions: boolean = false;
  showDetails: boolean = false;
  buffer: number = 0;
  years: any =  [];
  case_types: any = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    bindStepper();
  }
  onShowEntryForm(){
    this.showForm = !this.showForm;
    this.showOptions = true;
    let year = parseInt(this.onGetYears());
    for(var i=15;i<year+1;i++){
      this.years.push('20'+i);
    }
    this.onGetCaseTypes(); 
  }
  onShowForm(){
    this.showForm = !this.showForm;
    this.showOptions = false;
  }
  onHideForm(){
    this.showForm = !this.showForm;
    this.showOptions = false;
  }
  onGetYears(){
    let date = new Date();
    var year = date.getFullYear().toString();
    year = year.slice(-2);
    return year;
  }
  onGetCaseTypes(){
    this.http.get_case_types().subscribe(data => {
      this.case_types = data.results;
    })
  }
}
