import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-department-master',
  template: `<div class="d-flex">
            <app-sidebar></app-sidebar>
            <div class="d-block w-100">
                <app-header></app-header>
                <div class="mt-4 text-center">
                  <h2>Department Master</h2>
                </div>
                <app-view-department *ngIf="showViewDepartment" (displayAddDept)="onShowAddDept($event)" (displayEditDept)="onShowEditDept($event)"></app-view-department>
                <app-add-department *ngIf="showAddDepartment" (hide)="onHide($event)"></app-add-department>
                <app-edit-department *ngIf="showEditDepartment" (hide)="onHide($event)" [dName]="d_name" [dDescp]="d_descp" [dId]="d_id" [dComplex]="d_complex"></app-edit-department>
            </div>
          </div>`,
  styleUrls: ['./department-master.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentMasterComponent{
  showAddDepartment: boolean = false;
  showViewDepartment: boolean = true;
  showEditDepartment: boolean = false;
  d_name: string = '';
  d_descp: string = '';
  d_id: string = '';
  d_complex: string = '';

  onShowAddDept(data: { status: boolean}){
    this.showAddDepartment = data.status;
    this.showEditDepartment = !data.status;
    this.showViewDepartment = !data.status;
  }
  onShowEditDept(data: { status: boolean, dept_name: string, dept_descp: string, dept_id: string, dept_complex: string}){
    this.showAddDepartment = !data.status;
    this.showEditDepartment = data.status;
    this.showViewDepartment = !data.status;
    this.d_name = data.dept_name;
    this.d_descp = data.dept_descp;
    this.d_id = data.dept_id;
    this.d_complex = data.dept_complex;
  }
  onHide(data: { status: boolean}){
    this.showAddDepartment = !data.status;
    this.showEditDepartment = !data.status;
    this.showViewDepartment = data.status;
  }
}
