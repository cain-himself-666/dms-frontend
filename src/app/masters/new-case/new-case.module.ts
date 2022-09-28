import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { AddNewCaseComponent } from './new-case-master/add-new-case/add-new-case.component';
import { EditNewCaseComponent } from './new-case-master/edit-new-case/edit-new-case.component';
import { ViewNewCaseComponent } from './new-case-master/view-new-case/view-new-case.component';
import { NewCaseMasterComponent } from './new-case-master/new-case-master.component';


@NgModule({
  declarations: [
    AddNewCaseComponent,
    EditNewCaseComponent,
    ViewNewCaseComponent,
    NewCaseMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule
  ]
})
export class NewCaseModule { }
