import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { EmployeeMasterComponent } from './masters/employee/employee-master/employee-master.component';
import { AuthGuard } from './utilities/guards/auth.guard';
import { RedirectGuard } from './utilities/guards/redirect.guard';
import { ComplexMasterComponent } from './masters/complex/complex-master/complex-master.component';
import { DepartmentMasterComponent } from './masters/department/department-master/department-master.component';
import { DesignationMasterComponent } from './masters/designation/designation-master/designation-master.component';
import { DesignationAllocationComponent } from './accounts/designation-allocation/designation-allocation.component';
import { OldCaseMasterComponent } from './masters/old-case/old-case-master/old-case-master.component';
import { DutyAllocationComponent } from './accounts/duty-allocation/duty-allocation.component';
import { ProfileComponent } from './public/profile/profile.component';
import { ApproveCasesComponent } from './accounts/approver/approve-cases/approve-cases.component';
import { SearchComponent } from './public/search/search.component';
import { DocumentTypeMasterComponent } from './masters/document-type/document-type-master/document-type-master.component';
import { NewCaseMasterComponent } from './masters/new-case/new-case-master/new-case-master.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard]},
  { path: "dashboard", component: DashboardComponent, canActivate: [RedirectGuard]},
  { path: "employee", component: EmployeeMasterComponent, canActivate: [RedirectGuard]},
  { path: "department", component: DepartmentMasterComponent, canActivate: [RedirectGuard]},
  { path: "designation", component: DesignationMasterComponent, canActivate: [RedirectGuard]},
  { path: "complex", component: ComplexMasterComponent, canActivate: [RedirectGuard]},
  { path: "designation-allocation", component: DesignationAllocationComponent, canActivate: [RedirectGuard]},
  { path: "duty-allocation", component: DutyAllocationComponent, canActivate: [RedirectGuard]},
  { path: "old-case", component: OldCaseMasterComponent, canActivate: [RedirectGuard]},
  { path: "profile", component: ProfileComponent, canActivate: [RedirectGuard]},
  { path: "approve-cases", component: ApproveCasesComponent, canActivate: [RedirectGuard]},
  { path: "search", component: SearchComponent, canActivate: [RedirectGuard]},
  { path: "document", component: DocumentTypeMasterComponent,canActivate: [RedirectGuard]},
  { path: "new-case", component: NewCaseMasterComponent},
  { path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
