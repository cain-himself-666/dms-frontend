import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DesignationAllocationComponent } from './designation-allocation/designation-allocation.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DutyAllocationComponent } from './duty-allocation/duty-allocation.component';
import { ApproveCasesComponent } from './approve-cases/approve-cases.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    LoginComponent,
    DesignationAllocationComponent,
    DutyAllocationComponent,
    ApproveCasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AutocompleteLibModule,
    DataTablesModule,
  ]
})
export class AccountsModule { }
