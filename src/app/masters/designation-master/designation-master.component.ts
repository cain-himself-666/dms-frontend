import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {
  d_name: string = '';
  d_descp: string = '';
  d_id: any;
  d_group: string = '';
  showData: boolean = false;
  showForm: boolean = false;
  designations: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.http.get_designations().subscribe(data => {
      if(data.results.length === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.designations = data.results;
      }
    })
  }
  onSubmitDesg(data:any, group:string){
    let fd = new FormData();
    if(!this.d_id){
      fd.append('designation_name', data.desg_name);
      fd.append('designation_description', data.desg_descp);
      fd.append('designation_group', group);
      this.http.add_designation(fd).subscribe(data => {
        console.log(data);
      })
    }
    else{
      fd.append('designation_name', data.desg_name);
      fd.append('designation_description', data.desg_descp);
      fd.append('designation_group', group);
      fd.append('id', this.d_id);
      this.http.update_designation(fd).subscribe(data => {
        console.log(data);
      })
    }
  }
  onShowEntryForm(){
    this.showForm = !this.showForm;
    this.d_name = '';
    this.d_descp = '';
    this.d_group = '0';
  }
  onShowForm(id: number){
    this.showForm = !this.showForm;
    this.d_id = id;
    this.http.get_designation(id).subscribe(data => {
      this.d_name = data.designation_name;
      this.d_descp = data.designation_description;
      this.d_group = data.designation_group;
    })
  }
  onHideForm(){
    this.showForm = !this.showForm;
  }
  isDelete(id:string, is_delete:boolean){
    let i:any;
    if(is_delete){
      i = false;
    }
    else{
      i = true;
    }
    console.log(i);
    let fd = new FormData();
    fd.append('id', id);
    fd.append('designation_isDeleted', i);
    this.http.update_designation_isDelete(fd).subscribe(data => {
      console.log(data);
    })
  }
}
