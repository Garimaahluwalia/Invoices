import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { CLIENTS, INVOICES, ROUTELINKS } from './constants/routes';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MainComponent } from './components/layout/main/main.component';
import { AuthService } from './services/auth/auth.service';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { AddInvoicesComponent } from './components/invoices/add-invoices/add-invoices.component';
import { InvoiceListDetailsComponent } from './components/invoices/invoice-list-details/invoice-list-details.component';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './modals/add-client/add-client.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { ClientDetailsComponent } from './components/invoices/add-invoices/from-groups/client-details/client-details.component'; 
import { MainInvoiceComponent } from './components/invoices/main-invoice/main-invoice.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { invoiceactionsComponent } from './modals/invoice-actions/invoice-actions.component';


const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthService],
    children: [
      {
        path: "",
        component: MainInvoiceComponent
      },
      {
        path: INVOICES.MAIN_INVOICES,
        component: MainInvoiceComponent
      }
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
    component: InvoiceComponent,
    children: [
      {
        path: CLIENTS.DELETE_CLIENTS,
        component: DeleteComponent
      },
      {
        path : INVOICES.INVOICE_ACTIONS,
        component : invoiceactionsComponent
      }
    ]
  },
  {
    path: INVOICES.ADD_INVOICE,
    component: AddInvoicesComponent,
    children: [
      {
        path: CLIENTS.ADD_CLIENTS,
        component: AddClientComponent
      },
      {
        path: CLIENTS.UPDATE_CLIENT,
        component: AddClientComponent
      },

    ]
  },
  {
    path: INVOICES.UPDATE_INVOICE,
    component: AddInvoicesComponent,
    children: [
      {
        path: CLIENTS.ADD_CLIENTS,
        component: AddClientComponent
      },
      {
        path: CLIENTS.UPDATE_CLIENT,
        component: AddClientComponent
      },

    ]
  },
  {
    path: CLIENTS.CLIENTS,
    component: ClientComponent,
    children: [
      {
        path: CLIENTS.ADD_CLIENTS,
        component: AddClientComponent
      },
      {
        path: CLIENTS.UPDATE_CLIENT,
        component: AddClientComponent
      },
      {
        path: CLIENTS.DELETE_CLIENTS,
        component: DeleteComponent
      },
    ]
  },
  {
    path: CLIENTS.PROFILE,
    component: MainComponent,
    children: [{
      path: "",
      component: ProfileComponent
    }]
  },
  {
    path: CLIENTS.ADD_CLIENTS,
    component: AddClientComponent
  },
  {
    path: CLIENTS.DELETE,
    component: DeleteComponent
  },
  {
    path: INVOICES.INVOICE_ACTION,
    component:  invoiceactionsComponent
  },

  {
    path: CLIENTS.CLIENT_DETAILS,
    component: ClientDetailsComponent
  },
  {
    path: INVOICES.MAIN_INVOICES,
    component: MainInvoiceComponent
  },
  {
    path: INVOICES.VIEW_INVOICE_LIST,
    component: InvoiceListDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
