import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-complex-master',
  template: `<div class="d-flex">
              <app-sidebar></app-sidebar>
              <div class="d-block w-100">
                  <app-header></app-header>
                  <div class="title mt-4 text-center">
                      <h2>Complex Master</h2>
                  </div>
                  <app-view-complex *ngIf="showViewComplex" (displayAddComplex)="onShowAddComplex($event)" (displayEditComplex)="onShowEditComplex($event)"></app-view-complex>
                  <app-add-complex *ngIf="showAddComplex" (hide)="onHide($event)"></app-add-complex>
                  <app-edit-complex *ngIf="showEditComplex" (hide)="onHide($event)" [cName]="complex_name" [cDescp]="complex_description" [cId]="complex_id"></app-edit-complex>
              </div>
            </div>`,
  styleUrls: ['./complex-master.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ComplexMasterComponent{
  showViewComplex: boolean = true;
  showAddComplex: boolean = false;
  showEditComplex: boolean = false;
  complex_name: string = '';
  complex_description: string = '';
  complex_id: string = '';

  onShowAddComplex(data: { status: boolean }){
    this.showAddComplex = data.status;
    this.showEditComplex = !data.status;
    this.showViewComplex = !data.status;
  }
  onHide(data: {status: boolean}){
    this.showAddComplex = !data.status;
    this.showEditComplex = !data.status;
    this.showViewComplex = data.status;
  }
  onShowEditComplex(data: { status: boolean, complex_name: string, complex_description: string, complex_id:string}){
    this.showEditComplex = data.status;
    this.showAddComplex = !data.status;
    this.showViewComplex = !data.status;
    this.complex_name = data.complex_name;
    this.complex_description = data.complex_description;
    this.complex_id = data.complex_id;
  }
}
