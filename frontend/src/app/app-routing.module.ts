import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { VerifyComponent } from './verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "", component: UserComponent },
  { path: "verify/:id", component: VerifyComponent},
  { path: "dashboard", component: DashboardComponent },
  { path: "**", redirectTo: "/" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
