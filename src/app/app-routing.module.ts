import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { CLIENTS, INVOICES, ROUTELINKS } from './constants/routes';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { MainComponent } from './components/layout/main/main.component';
import { AuthService } from './services/auth/auth.service';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { AddInvoicesComponent } from './components/invoices/add-invoices/add-invoices.component';
import { InvoiceListDetailsComponent } from './components/invoices/invoice-list-details/invoice-list-details.component';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { DeleteComponent } from './Modals/delete/delete.component';


const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthService],
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: ROUTELINKS.DASHBOARD,
        component: DashboardComponent
      },

    ]
  },
  {
    path: ROUTELINKS.LOGIN,
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: ROUTELINKS.SIGNUP,
    component: SignupComponent
  },
  {
    path: ROUTELINKS.RESET_PASSWORD,
    component: ResetPasswordComponent
  },
  {
    path: ROUTELINKS.MAINLAYOUT,
    component: MainComponent
  },
  {
    path: INVOICES.INVOICE,
    component: InvoiceComponent
  },
  {
    path: INVOICES.ADD_INVOICE,
    component: AddInvoicesComponent,
  },
  {
    path: INVOICES.VIEW_INVOICE_LIST,
    component: InvoiceListDetailsComponent
  },
  {
    path: INVOICES.UPDATE_INVOICE,
    component: AddInvoicesComponent
  },
  {
    path: CLIENTS.CLIENTS,
    component: ClientComponent,
    children: [
      {
        path:  CLIENTS.ADD_CLIENTS,
        component: AddClientComponent
      },
      {
        path : CLIENTS.UPDATE_CLIENT,
        component : AddClientComponent
      },
      {
        path : CLIENTS.DELETE_CLIENTS,
        component: DeleteComponent
      }
    
    ]
  },
  {
    path : CLIENTS.ADD_CLIENTS,
    component: AddClientComponent
  },
  {
    path: CLIENTS.DELETE,
    component: DeleteComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
