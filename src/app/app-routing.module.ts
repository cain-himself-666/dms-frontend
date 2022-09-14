import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { RegistrationComponent } from './accounts/registration/registration.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { EmployeeMasterComponent } from './masters/employee-master/employee-master.component';
import { AuthGuard } from './utilities/guards/auth.guard';
import { RedirectGuard } from './utilities/guards/redirect.guard';
import { DepartmentMasterComponent } from './masters/department-master/department-master.component';
import { DesignationMasterComponent } from './masters/designation-master/designation-master.component';
import { ComplexMasterComponent } from './masters/complex-master/complex-master.component';
import { DesignationAllocationComponent } from './accounts/designation-allocation/designation-allocation.component';
import { OldCaseMasterComponent } from './masters/old-case-master/old-case-master.component';
import { DutyAllocationComponent } from './accounts/duty-allocation/duty-allocation.component';
import { ProfileComponent } from './public/profile/profile.component';
import { ApproveCasesComponent } from './accounts/approve-cases/approve-cases.component';
import { SearchComponent } from './public/search/search.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "registration", component: RegistrationComponent},
  { path: "employee", component: EmployeeMasterComponent},
  { path: "department", component: DepartmentMasterComponent},
  { path: "designation", component: DesignationMasterComponent},
  { path: "complex", component: ComplexMasterComponent},
  { path: "designation-allocation", component: DesignationAllocationComponent},
  { path: "duty-allocation", component: DutyAllocationComponent},
  { path: "old-case", component: OldCaseMasterComponent},
  { path: "profile", component: ProfileComponent},
  { path: "approve-cases", component: ApproveCasesComponent},
  { path: "search", component: SearchComponent},
  { path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
