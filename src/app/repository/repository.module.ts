import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    EntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers:[
    DatePipe
  ]
})
export class RepositoryModule { }
