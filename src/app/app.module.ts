import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
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
import { InvoicedataComponent } from './components/invoices/add-invoices/FormsGroup/invoicedata/invoicedata.component';
import { CompanyaddressComponent } from './components/invoices/add-invoices/FormsGroup/companyaddress/companyaddress.component';
import { ProductdetailsComponent } from './components/invoices/add-invoices/FormsGroup/productdetails/productdetails.component';
import { PaymentdetailsComponent } from './components/invoices/add-invoices/FormsGroup/paymentdetails/paymentdetails.component';
import { InvoiceListDetailsComponent } from './components/invoices/invoice-list-details/invoice-list-details.component';
import { AuthInterceptor } from './interceptors/intercept';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './Modals/add-client/add-client.component';
import { DeleteComponent } from './Modals/delete/delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientDetailsComponent } from './components/invoices/add-invoices/FormsGroup/client-details/client-details.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PhonenumberDirective } from './directives/phonenumber.directive';
import { MainInvoiceComponent } from './components/invoices/main-invoice/main-invoice.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { DatePipe } from '@angular/common';
import { StatusComponent } from './components/invoices/status/status.component';
import { invoiceactionsComponent } from './Modals/invoice-actions/invoice-actions.component';


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
    ProductdetailsComponent,
    PaymentdetailsComponent,
    InvoiceListDetailsComponent,
    ClientComponent,
    AddClientComponent,
    DeleteComponent,
    ClientDetailsComponent,
    PhonenumberDirective,
    MainInvoiceComponent,
    ProfileComponent,
    StatusComponent,
    invoiceactionsComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    CKEditorModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
