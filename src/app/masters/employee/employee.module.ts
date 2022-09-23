import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { AddEmployeeComponent } from './employee-master/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employee-master/view-employee/view-employee.component';
import { EditEmployeeComponent } from './employee-master/edit-employee/edit-employee.component';
import { ChangePassComponent } from './employee-master/change-pass/change-pass.component';


@NgModule({
  declarations: [
    EmployeeMasterComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    EditEmployeeComponent,
    ChangePassComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class EmployeeModule { }
