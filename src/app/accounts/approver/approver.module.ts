import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { ViewCasesComponent } from './approve-cases/view-cases/view-cases.component';
import { EditCasesComponent } from './approve-cases/edit-cases/edit-cases.component';
import { ApproveCasesComponent } from './approve-cases/approve-cases.component';



@NgModule({
  declarations: [
    ViewCasesComponent,
    EditCasesComponent,
    ApproveCasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class ApproverModule { }
