import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { ViewDepartmentComponent } from './department-master/view-department/view-department.component';
import { AddDepartmentComponent } from './department-master/add-department/add-department.component';
import { EditDepartmentComponent } from './department-master/edit-department/edit-department.component';


@NgModule({
  declarations: [
    DepartmentMasterComponent,
    ViewDepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    SharedModule,
  ]
})
export class DepartmentModule { }
