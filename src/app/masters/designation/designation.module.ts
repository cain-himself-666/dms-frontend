import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { AddDesignationComponent } from './designation-master/add-designation/add-designation.component';
import { ViewDesignationComponent } from './designation-master/view-designation/view-designation.component';
import { EditDesignationComponent } from './designation-master/edit-designation/edit-designation.component';


@NgModule({
  declarations: [
    DesignationMasterComponent,
    AddDesignationComponent,
    ViewDesignationComponent,
    EditDesignationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    SharedModule,
  ]
})
export class DesignationModule { }
