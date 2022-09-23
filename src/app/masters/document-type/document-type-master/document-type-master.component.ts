import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-document-type-master',
  template: `<div class="d-flex">
            <app-sidebar></app-sidebar>
            <div class="d-block w-100">
                <app-header></app-header>
                <div class="title mt-4 text-center">
                    <h2>Document Type Master</h2>
                </div>
                <app-view-document-type *ngIf="showViewDocType" (displayAddDocType)="onShowAddDocType($event)" (displayEditDocType)="onShowEditDocType($event)"></app-view-document-type>
                <app-add-document-type *ngIf="showAddDocType" (hide)="onHide($event)"></app-add-document-type>
                <app-edit-document-type *ngIf="showEditDocType" (hide)="onHide($event)" [doc_type_name]="doc_type_name" [doc_type_id]="doc_type_id"></app-edit-document-type>
            </div>
          </div>`,
  styleUrls: ['./document-type-master.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentTypeMasterComponent{
  doc_type_name: string = '';
  doc_type_id: string = '';
  showAddDocType: boolean = false;
  showViewDocType: boolean = true;
  showEditDocType: boolean = false;

  onShowAddDocType(data: { status: boolean}){
    this.showAddDocType = data.status;
    this.showEditDocType = !data.status;
    this.showViewDocType = !data.status;
  }
  onShowEditDocType(data: { status: boolean, doc_type:string, doc_type_id:string}){
    this.showAddDocType = !data.status;
    this.showEditDocType = data.status;
    this.showViewDocType = !data.status;
    this.doc_type_name = data.doc_type;
    this.doc_type_id = data.doc_type_id;
  }
  onHide(data: { status: boolean}){
    this.showAddDocType = !data.status;
    this.showEditDocType = !data.status;
    this.showViewDocType = data.status;
  }
}
