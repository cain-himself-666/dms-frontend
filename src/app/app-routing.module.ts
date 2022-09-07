import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { RegistrationComponent } from './accounts/registration/registration.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { EntryComponent } from './repository/entry/entry.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { AuthGuard } from './utilities/guards/auth.guard';
import { RedirectGuard } from './utilities/guards/redirect.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "registration", component: RegistrationComponent},
  { path: "case-entry", component: EntryComponent},
  { path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
