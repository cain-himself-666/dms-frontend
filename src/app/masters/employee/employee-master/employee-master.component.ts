import { Component, ViewEncapsulation } from '@angular/core';
import { Employee } from './employee-model';
@Component({
  selector: 'app-employee-master',
  template: `<div class="d-flex">
            <app-sidebar></app-sidebar>
            <div class="d-block w-100">
                <app-header></app-header>
                <div class="mt-4 text-center">
                  <h2>Employee Master</h2>
                </div>
                <app-view-employee *ngIf="showViewEmployee" (displayAddEmployee)="onShowAddEmployee($event)" (displayEditEmployee)="onShowEditEmployee($event)"></app-view-employee>
                <app-edit-employee *ngIf="showEditEmployee" (hide)="onHide($event)" [employee]="emp" [id]="id" [profileId]="profile_id" (displayChangePass)="onShowChangePass($event)"></app-edit-employee>
                <app-add-employee *ngIf="showAddEmployee" (hide)="onHide($event)"></app-add-employee>
                <app-change-pass *ngIf="showChangePass" (hidePass)="onHidePass($event)" [username]="username" [id]="id" [email]="email" [group]="group"></app-change-pass>
            </div>
          </div>`,
  styleUrls: ['./employee-master.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeMasterComponent{
  showViewEmployee: boolean = true;
  showAddEmployee: boolean = false;
  showEditEmployee: boolean = false;
  showChangePass: boolean = false;
  emp: any;
  id: string = '';
  profile_id: string = '';
  username: string = '';
  email: string = '';
  group: string = '';
  onShowAddEmployee(data: { status: boolean }){
    this.showViewEmployee = !data.status;
    this.showAddEmployee = data.status;
    this.showEditEmployee = !data.status;
    this.showChangePass = !data.status;
  }
  onShowEditEmployee(data: { status: boolean, employee: Employee, id: string, profile_id:string }){
    this.showViewEmployee = !data.status;
    this.showAddEmployee = !data.status;
    this.showEditEmployee = data.status;
    this.showChangePass = !data.status;
    this.emp = data.employee;
    this.id = data.id;
    this.profile_id = data.profile_id;
  }
  onShowChangePass(data: { status: boolean, username: string, id: string, email: string, group:string }){
    this.showViewEmployee = !data.status;
    this.showAddEmployee = !data.status;
    this.showEditEmployee = !data.status;
    this.showChangePass = data.status;
    this.username = data.username;
    this.id = data.id;
    this.email = data.email,
    this.group = data.group
  }
  onHide(data: { status: boolean }){
    this.showViewEmployee = data.status;
    this.showAddEmployee = !data.status;
    this.showEditEmployee = !data.status;
    this.showChangePass = !data.status;
  }
  onHidePass(data: { status: boolean }){
    this.showViewEmployee = !data.status;
    this.showAddEmployee = !data.status;
    this.showEditEmployee = data.status;
    this.showChangePass = !data.status;
  }
}
