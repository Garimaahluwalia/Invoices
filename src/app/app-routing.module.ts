import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { CLIENTS, INVOICES, PROFILE, QUOTATIONS, ROUTELINKS } from './constants/routes';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MainComponent } from './components/layout/main/main.component';
import { AuthService } from './services/auth/auth.service';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { AddInvoicesComponent } from './components/invoices/add-invoices/add-invoices.component';
import { InvoiceListDetailsComponent } from './components/invoices/invoice/invoice-list-details/invoice-list-details.component';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './modals/add-client/add-client.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { ClientDetailsComponent } from './components/invoices/add-invoices/from-groups/client-details/client-details.component';
import { dashboardComponent } from './components/invoices/dashboard/dashboard.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { invoiceactionsComponent } from './modals/invoice-actions/invoice-actions.component';
import { AddRecordPaymentComponent } from './modals/add-record-payment/add-record-payment.component';
import { SaveInvoicePageComponent } from './components/invoices/invoice/save-invoice-page/save-invoice-page.component';
import { AddSentEmailComponent } from './modals/add-sent-email/add-sent-email.component';
import { RemovePaymentComponent } from './components/invoices/invoice/remove-payment/remove-payment.component';
import { QuotationsComponent } from './components/quotations/quotations.component';
import { QuotationListDetailsComponent } from './components/quotations/quotation-list-details/quotation-list-details.component';
import { InvoiceTypes } from './types/invoice-types';
import { SaveQuotationPageComponent } from './components/quotations/save-quotation-page/save-quotation-page.component';
import { ViewrecordpaymentComponent } from './viewrecordpayment/viewrecordpayment.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthService],
    children: [
      {
        path: "",
        component: dashboardComponent
      },
      {
        path: INVOICES.DASHBOARD,
        component: dashboardComponent
      },
      {
        path: QUOTATIONS.QUOTATIONS,
        component: QuotationsComponent,
        children: [
          {
            path: INVOICES.SENT_EMAIL,
            component: AddSentEmailComponent
          },
          {
            path: CLIENTS.DELETE_CLIENTS,
            component: DeleteComponent
          }
        ]
      },
      {
        path: INVOICES.INVOICE,
        component: InvoiceComponent,
        data: {
          state: InvoiceTypes.Invoice
        },
        children: [
          {
            path: CLIENTS.DELETE_CLIENTS,
            component: DeleteComponent
          },
          {
            path: INVOICES.INVOICE_ACTIONS,
            component: invoiceactionsComponent
          },
          {
            path: INVOICES.SENT_EMAIL,
            component: AddSentEmailComponent
          },
          {
            path: INVOICES.RECORD_PAYMENTS,
            component: AddRecordPaymentComponent
          },
          {
            path: INVOICES.VIEW_PAYMENTS,
            component: ViewrecordpaymentComponent
          },
          {
            path: INVOICES.REMOVE_PAYMENTS,
            component: RemovePaymentComponent
          }
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
    ]
  },
  {
    path: ROUTELINKS.LOGIN,
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: INVOICES.ADD_INVOICE,
    component: AddInvoicesComponent,
    data: {
      state: InvoiceTypes.Invoice
    },
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
    path: ROUTELINKS.MAINLAYOUT,
    component: MainComponent,

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
    path: PROFILE.PROFILE,
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
    component: invoiceactionsComponent
  },
  {
    path: CLIENTS.CLIENT_DETAILS,
    component: ClientDetailsComponent
  },
  {
    path: INVOICES.DASHBOARD,
    component: dashboardComponent
  },
  {
    path: INVOICES.VIEW_INVOICE_LIST,
    component: InvoiceListDetailsComponent,
    children: [
      {
        path : CLIENTS.DELETE,
        component: DeleteComponent
      }
    ]
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
    path: INVOICES.SAVE_INVOICE_PAGE,
    component: SaveInvoicePageComponent,
    children: [
      {
        path: INVOICES.SENT_EMAIL,
        component: AddSentEmailComponent
      },
      {
        path: INVOICES.RECORD_PAYMENTS,
        component: AddRecordPaymentComponent
      },
      {
        path: INVOICES.INVOICE_ACTIONS,
        component: invoiceactionsComponent
      },
      {
        path: CLIENTS.DELETE_CLIENTS,
        component: DeleteComponent
      },
    ]
  },
  {
    path: INVOICES.REMOVE_PAYMENT,
    component: RemovePaymentComponent
  },
  {
    path: QUOTATIONS.VIEW_QUOTATIONS_LIST,
    component: QuotationListDetailsComponent,
    children: [
      {
        path : CLIENTS.DELETE,
        component: DeleteComponent
      }
    ]
  },
  {
    path: QUOTATIONS.SAVE_QUOTATIONS_PAGE,
    component: SaveQuotationPageComponent,
    children: [
      {
        path: INVOICES.SENT_EMAIL,
        component: AddSentEmailComponent
      },
      {
        path: INVOICES.RECORD_PAYMENTS,
        component: AddRecordPaymentComponent
      },
      {
        path: INVOICES.INVOICE_ACTIONS,
        component: invoiceactionsComponent
      },
      {
        path: CLIENTS.DELETE_CLIENTS,
        component: DeleteComponent
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
