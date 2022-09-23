import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-designation-master',
  // templateUrl: './designation-master.component.html',
  template: `<div class="d-flex">
            <app-sidebar></app-sidebar>
            <div class="d-block w-100">
                <app-header></app-header>
                <div class="mt-4 text-center">
                    <h2>Designation Master</h2>
                </div>
                <app-view-designation *ngIf="showViewDesg" (displayAddDesg)="onShowAddDesg($event)" (displayEditDesg)="onShowEditDesg($event)"></app-view-designation>
                <app-add-designation *ngIf="showAddDesg" (hide)="onHide($event)"></app-add-designation>
                <app-edit-designation *ngIf="showEditDesg" (hide)="onHide($event)" [dName]="d_name" [dId]="d_id" [dDescp]="d_descp" [dGroup]="d_group"></app-edit-designation>
            </div>
          </div>`,
  styleUrls: ['./designation-master.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DesignationMasterComponent{
  d_name: string = '';
  d_descp: string = '';
  d_group: string = '';
  d_id: string = '';
  showAddDesg: boolean = false;
  showViewDesg: boolean = true;
  showEditDesg: boolean = false;

  onShowAddDesg(data: { status: boolean}){
    this.showAddDesg = data.status;
    this.showEditDesg = !data.status;
    this.showViewDesg = !data.status;
  }
  onShowEditDesg(data: { status: boolean, desg_name:string, desg_descp: string, desg_group: string, desg_id:string}){
    this.showAddDesg = !data.status;
    this.showEditDesg = data.status;
    this.showViewDesg = !data.status;
    this.d_name = data.desg_name;
    this.d_descp = data.desg_descp;
    this.d_group = data.desg_group;
    this.d_id = data.desg_id;
  }
  onHide(data: { status: boolean}){
    this.showAddDesg = !data.status;
    this.showEditDesg = !data.status;
    this.showViewDesg = data.status;
  }
}
