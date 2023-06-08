import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { MainComponent } from './components/layout/main/main.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { AddInvoicesComponent } from './components/invoices/add-invoices/add-invoices.component';
import { EmailDirective } from './directives/email.directive';
import { UsernameDirective } from './directives/username.directive';
import { InvoicedataComponent } from './components/invoices/add-invoices/invoicedata/invoicedata.component';
import { CompanyaddressComponent } from './components/invoices/add-invoices/companyaddress/companyaddress.component';
import { ShippingaddressComponent } from './components/invoices/add-invoices/shippingaddress/shippingaddress.component';
import { BillingaddressComponent } from './components/invoices/add-invoices/billingaddress/billingaddress.component';
import { ProductdetailsComponent } from './components/invoices/add-invoices/productdetails/productdetails.component';
import { PaymentdetailsComponent } from './components/invoices/add-invoices/paymentdetails/paymentdetails.component';
import { InvoiceListDetailsComponent } from './components/invoices/invoice-list-details/invoice-list-details.component';
import { AddinvoicethemeComponent } from './components/invoices/addinvoicetheme/addinvoicetheme.component';
import { AuthInterceptor } from './interceptors/intercept';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './components/clients/client/client.component';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: false,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    InvoiceComponent,
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ResetPasswordComponent,
    AddInvoicesComponent,
    EmailDirective,
    UsernameDirective,
    InvoicedataComponent,
    CompanyaddressComponent,
    ShippingaddressComponent,
    BillingaddressComponent,
    ProductdetailsComponent,
    PaymentdetailsComponent,
    InvoiceListDetailsComponent,
    AddinvoicethemeComponent,
    ClientComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
