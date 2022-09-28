import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexModule } from './complex/complex.module';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { EmployeeModule } from './employee/employee.module';
import { OldCaseModule } from './old-case/old-case.module';
import { NewCaseModule } from './new-case/new-case.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ComplexModule,
    DepartmentModule,
    DesignationModule,
    DocumentTypeModule,
    EmployeeModule,
    OldCaseModule,
    NewCaseModule,
  ],
  providers: [
    DatePipe
  ]
})
export class MastersModule { }
