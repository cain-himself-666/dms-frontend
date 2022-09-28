import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { AddOldCaseComponent } from './old-case-master/add-old-case/add-old-case.component';
import { EditOldCaseComponent } from './old-case-master/edit-old-case/edit-old-case.component';
import { ViewOldCaseComponent } from './old-case-master/view-old-case/view-old-case.component';
import { OldCaseMasterComponent } from './old-case-master/old-case-master.component';


@NgModule({
  declarations: [
    AddOldCaseComponent,
    EditOldCaseComponent,
    ViewOldCaseComponent,
    OldCaseMasterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class OldCaseModule { }
