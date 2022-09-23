import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplexModule } from './complex/complex.module';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { EmployeeModule } from './employee/employee.module';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { OldCaseMasterComponent } from './old-case-master/old-case-master.component';
import { DatePipe } from '@angular/common';
import { NewCaseMasterComponent } from './new-case-master/new-case-master.component';

@NgModule({
  declarations: [
    OldCaseMasterComponent,
    NewCaseMasterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    ComplexModule,
    DepartmentModule,
    DesignationModule,
    DocumentTypeModule,
    EmployeeModule
  ],
  providers: [
    DatePipe
  ]
})
export class MastersModule { }
