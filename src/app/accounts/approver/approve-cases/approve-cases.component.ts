import { Component, ViewEncapsulation } from '@angular/core';
import { OldCase } from 'src/app/masters/old-case/old-case-master/old-case-model';
@Component({
  selector: 'app-approve-cases',
  // templateUrl: './approve-cases.component.html',
  template: `<div class="d-flex">
              <app-sidebar></app-sidebar>
              <div class="d-block w-100">
                  <app-header></app-header>
                  <div class="title mt-4 text-center">
                    <h2>Cases</h2>
                  </div>
                  <app-view-cases *ngIf="showViewCases" (displayEditCases)="onShowEditCases($event)"></app-view-cases>
                  <app-edit-cases *ngIf="showEditCases" (hide)="onHide($event)" [cases]="cases" [documents]="documents"></app-edit-cases>
              </div>
            </div>
            `,
  styleUrls: ['./approve-cases.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApproveCasesComponent{
  showViewCases: boolean = true;
  showEditCases: boolean = false;
  cases!: OldCase;
  documents: any;
  onShowEditCases(data: { status: boolean, case: OldCase, documents: any}){
    this.showViewCases = !data.status;
    this.showEditCases = data.status;
    this.documents = data.documents;
    this.cases = data.case;
  }
  onHide(data: {status: boolean}){
    this.showViewCases = data.status;
    this.showEditCases = !data.status;
  }
}
