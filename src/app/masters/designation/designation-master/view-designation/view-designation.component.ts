import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-designation',
  templateUrl: './view-designation.component.html',
  styleUrls: ['./view-designation.component.css']
})
export class ViewDesignationComponent implements OnInit {
  @Output('displayAddDesg') onShowAddDesg: any = new EventEmitter<{status: boolean}>();
  @Output('displayEditDesg') onShowEditDesg: any = new EventEmitter<{status: boolean}>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showData: boolean = false;
  designations: any = [];
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.getDesignation();
  }
  onViewAddDesg(){
    this.onShowAddDesg.emit({
      status: true,
    })
  }
  onViewEditDesg(id:number){
    this.http.get_designation(id).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.onShowEditDesg.emit({
        status: true,
        desg_name: data.designation_name,
        desg_descp: data.designation_description,
        desg_group: data.designation_group,
        desg_id: data.id,
      })
    })
  }
  getDesignation(){
    this.http.get_designations().pipe(takeUntil(this.notifier)).subscribe(data => {
      if(data.results.length === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.designations = data.results;
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
    fd.append('designation_isDeleted', i);
    this.http.update_designation_isDelete(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
      this.getDesignation();
    })
  }

}
