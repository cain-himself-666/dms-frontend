import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-new-case-master',
  templateUrl: './new-case-master.component.html',
  styleUrls: ['./new-case-master.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewCaseMasterComponent{
  showViewNewCase: boolean = true;
  showAddNewCase: boolean = false;
  showEditNewCase: boolean = false;

  onShowAddNewCase(data: { status: boolean }){
    this.showAddNewCase = data.status;
    this.showViewNewCase = !data.status;
    this.showEditNewCase = !data.status;
  }
  onShowEditNewCase(data: { status: boolean, id: boolean }){
    this.showAddNewCase = !data.status;
    this.showViewNewCase = !data.status;
    this.showEditNewCase = data.status;
  }
  onHide(data: { status: boolean }){
    this.showAddNewCase = !data.status;
    this.showViewNewCase = data.status;
    this.showEditNewCase = !data.status;
  }
}
