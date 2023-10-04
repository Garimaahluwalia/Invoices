import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { MainComponent } from './components/layout/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InvoicedataComponent } from './components/invoices/add-invoices/from-groups/invoicedata/invoicedata.component';
import { CompanyaddressComponent } from './components/invoices/add-invoices/from-groups/companyaddress/companyaddress.component';
import { ProductdetailsComponent } from './components/invoices/add-invoices/from-groups/productdetails/productdetails.component';
import { PaymentdetailsComponent } from './components/invoices/add-invoices/from-groups/paymentdetails/paymentdetails.component';
import { InvoiceListDetailsComponent } from './components/invoices/invoice/invoice-list-details/invoice-list-details.component';
import { AuthInterceptor } from './interceptors/intercept';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './modals/add-client/add-client.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientDetailsComponent } from './components/invoices/add-invoices/from-groups/client-details/client-details.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PhonenumberDirective } from './directives/phonenumber.directive';
import { dashboardComponent } from './components/layout/dashboard/dashboard.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { DatePipe } from '@angular/common';
import { invoiceactionsComponent } from './modals/invoice-actions/invoice-actions.component';
import { InvoiceNumberDirective } from './directives/invoice-number/invoice-number.directive';
import { SvgComponent } from './common/svg/svg.component';
import { AddFieldsComponent } from './modals/add-fields/add-fields.component';
import { APP_BASE_HREF } from '@angular/common';
import { LoaderComponent } from './common/loader/loader.component';
import { AddRecordPaymentComponent } from './modals/add-record-payment/add-record-payment.component';
import { SaveInvoicePageComponent } from './components/invoices/invoice/save-invoice-page/save-invoice-page.component';
import { MultiselectDropdownComponent } from './common/multiselect-dropdown/multiselect-dropdown.component';
import { AddSentEmailComponent } from './modals/add-sent-email/add-sent-email.component';
import { InvoiceSummaryComponent } from './components/invoices/invoice/invoice-summary/invoice-summary.component';
import { RemovePaymentComponent } from './components/invoices/invoice/remove-payment/remove-payment.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { SaveQuotationPageComponent } from './components/quotations/save-quotation-page/save-quotation-page.component';
import { QuotationsComponent } from './components/quotations/quotations.component';
import { QuotationListDetailsComponent } from './components/quotations/quotation-list-details/quotation-list-details.component';
import { MessagePreviewComponent } from './modals/message-preview/message-preview.component';
import { ViewrecordpaymentComponent } from './modals/viewrecordpayment/viewrecordpayment.component';
import {NgxPrintModule} from 'ngx-print';
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
    dashboardComponent,
    ProfileComponent,
    invoiceactionsComponent,
    InvoiceNumberDirective,
    SvgComponent,
    AddFieldsComponent,
    LoaderComponent,
    AddRecordPaymentComponent,
    SaveInvoicePageComponent,
    MultiselectDropdownComponent,
    AddSentEmailComponent,
    InvoiceSummaryComponent,
    RemovePaymentComponent,
    SaveQuotationPageComponent,
    QuotationsComponent,
    QuotationListDetailsComponent,
    MessagePreviewComponent,
    ViewrecordpaymentComponent
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '/app/' }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgxPaginationModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    CKEditorModule,
    AppRoutingModule,
    CdkAccordionModule,

  ]
})
export class AppModule { }
