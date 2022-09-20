import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { ComplexMasterComponent } from './complex-master/complex-master.component';
import { DataTablesModule } from 'angular-datatables';
import { OldCaseMasterComponent } from './old-case-master/old-case-master.component';
import { DatePipe } from '@angular/common';
import { DocumentTypeMasterComponent } from './document-type-master/document-type-master.component';
import { NewCaseMasterComponent } from './new-case-master/new-case-master.component';

@NgModule({
  declarations: [
    EmployeeMasterComponent,
    DepartmentMasterComponent,
    DesignationMasterComponent,
    ComplexMasterComponent,
    OldCaseMasterComponent,
    DocumentTypeMasterComponent,
    NewCaseMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
  ],
  providers: [
    DatePipe
  ]
})
export class MastersModule { }
