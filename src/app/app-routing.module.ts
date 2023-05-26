import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { ROUTELINKS } from './constants/routes';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path : "",
    component: LoginComponent
  },
  {
    path : ROUTELINKS.LOGIN,
    component:LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: ROUTELINKS.SIGNUP,
    component: SignupComponent
  },
  {
    path: ROUTELINKS.DASHBOARD,
    component: DashboardComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
