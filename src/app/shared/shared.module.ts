import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PagenotfoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, SidebarComponent]
})
export class SharedModule { }
