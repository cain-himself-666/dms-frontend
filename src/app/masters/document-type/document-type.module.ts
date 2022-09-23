import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { AddDocumentTypeComponent } from './document-type-master/add-document-type/add-document-type.component';
import { EditDocumentTypeComponent } from './document-type-master/edit-document-type/edit-document-type.component';
import { ViewDocumentTypeComponent } from './document-type-master/view-document-type/view-document-type.component';
import { DocumentTypeMasterComponent } from './document-type-master/document-type-master.component';



@NgModule({
  declarations: [
    AddDocumentTypeComponent,
    EditDocumentTypeComponent,
    ViewDocumentTypeComponent,
    DocumentTypeMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule
  ]
})
export class DocumentTypeModule { }
