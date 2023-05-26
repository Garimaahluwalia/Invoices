import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { MainComponent } from './components/layout/main/main.component';
import { ValidationDirective } from './directives/validation.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { LoginDirective } from './directives/login.directive';
import { SignupDirective } from './directives/signup.directive';


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
    ValidationDirective,
    LoginDirective,
    SignupDirective,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
