import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { DesignationAllocationComponent } from './designation-allocation/designation-allocation.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    DesignationAllocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AutocompleteLibModule,
  ]
})
export class AccountsModule { }
