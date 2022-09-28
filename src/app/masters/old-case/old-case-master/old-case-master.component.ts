import { Component, ViewEncapsulation } from '@angular/core';
import { OldCase } from './old-case-model';
@Component({
  selector: 'app-old-case-master',
  // templateUrl: './old-case-master.component.html',
  template: `
              <div class="d-flex">
                <app-sidebar></app-sidebar>
                <div class="d-block w-100">
                    <app-header></app-header>
                    <div class="title mt-4 text-center">
                      <h2>Old Cases</h2>
                    </div>
                    <app-view-old-case *ngIf="showViewOldCase" (displayAddOldCase)="onShowAddOldCase($event)" (displayEditOldCase)="onShowEditOldCase($event)"></app-view-old-case>
                    <app-edit-old-case *ngIf="showEditOldCase" (hide)="onHide($event)" [oldCases]="oldCase" [caseDocuments]="documents"></app-edit-old-case>
                    <app-add-old-case  *ngIf="showAddOldCase" (hide)="onHide($event)"></app-add-old-case>
                </div>
              </div>
            `,
  styleUrls: ['./old-case-master.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OldCaseMasterComponent{
  showViewOldCase: boolean = true;
  showAddOldCase: boolean = false;
  showEditOldCase: boolean = false;
  oldCase!: OldCase;
  documents: any;
  onShowAddOldCase(data: { status: boolean }){
    this.showAddOldCase = data.status;
    this.showViewOldCase = !data.status;
    this.showEditOldCase = !data.status;
  }
  onShowEditOldCase(data: { status: boolean, oldCase: OldCase, documents: any }){
    this.showAddOldCase = !data.status;
    this.showViewOldCase = !data.status;
    this.showEditOldCase = data.status;
    this.oldCase = data.oldCase;
    this.documents = data.documents;
  }
  onHide(data: { status: boolean }){
    this.showAddOldCase = !data.status;
    this.showViewOldCase = data.status;
    this.showEditOldCase = !data.status;
    
  }
}
