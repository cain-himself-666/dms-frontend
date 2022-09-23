import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-complex',
  templateUrl: './view-complex.component.html',
  styleUrls: ['./view-complex.component.css']
})
export class ViewComplexComponent implements OnInit {
  @Output('displayAddComplex') onAddComplex: any = new EventEmitter<{status: boolean}>();
  @Output('displayEditComplex') onShowEdit: any = new EventEmitter<{status: boolean}>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showData: boolean = false;
  complex: any = [];
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.getComplex();
  }
  getComplex(){
    this.http.get_complex().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.results.length === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.complex = data.results;
      }
    })
  }
  isDelete(id:string, is_delete:boolean){
    let i:any;
    if(is_delete){
      i = false;
    }
    else{
      i = true;
    }
    let fd = new FormData();
    fd.append('id', id);
    fd.append('complex_isDeleted', i);
    this.http.update_complex_isDelete(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getComplex();
    })
  }
  onViewAddComplex(){
    this.onAddComplex.emit({
      status: true
    });
  }
  onViewEditComplex(id:number){
    this.http.get_single_complex(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.onShowEdit.emit({
        status: true,
        complex_name: data.complex_name,
        complex_description: data.complex_description,
        complex_id: data.id
      })
    })
  }
}
