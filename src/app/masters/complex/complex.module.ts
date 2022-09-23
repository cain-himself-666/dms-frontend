import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexMasterComponent } from './complex-master/complex-master.component';
import { AddComplexComponent } from './complex-master/add-complex/add-complex.component';
import { ViewComplexComponent } from './complex-master/view-complex/view-complex.component';
import { EditComplexComponent } from './complex-master/edit-complex/edit-complex.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComplexMasterComponent,
    AddComplexComponent,
    ViewComplexComponent,
    EditComplexComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
  ]
})
export class ComplexModule { }
