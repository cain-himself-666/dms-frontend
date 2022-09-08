import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-complex-master',
  templateUrl: './complex-master.component.html',
  styleUrls: ['./complex-master.component.css']
})
export class ComplexMasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  complex: any = [];
  showData: boolean = false;
  showUpdate: boolean = false;
  c_name: string = '';
  c_descp: string = '';
  c_id: any;
  constructor(private http: HttpService, private route: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }
    this.http.get_complex().subscribe(data => {
      if(data.results.length === 0){
        this.showData = false;
      }
      else{
        this.showData = true;
        this.complex = data.results;
      }
    })
  }
  onSubmitComplex(data:any){
    let fd = new FormData();
    if(!this.c_id){
      fd.append('complex_name', data.complex_name);
      fd.append('complex_description', data.complex_description);
      this.http.add_complex(fd).subscribe(data => {
        console.log(data);
      })
    }
    else{
      fd.append('complex_name', this.c_name);
      fd.append('complex_description', this.c_descp);
      fd.append('id', this.c_id);
      this.http.update_complex(fd).subscribe(data => {
        console.log(data);
      })
    }
  }
  onShowUpdate(id:number){
    this.showUpdate = !this.showUpdate;
    this.http.get_single_complex(id).subscribe(data => {
      this.c_name = data.complex_name;
      this.c_descp = data.complex_description;
      this.c_id = data.id
    })
  }
  onHideUpdate(){
    this.showUpdate = !this.showUpdate;
  }
  onShowEntry(){
    this.showUpdate = !this.showUpdate;
  }
}
