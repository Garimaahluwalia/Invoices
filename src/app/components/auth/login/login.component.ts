import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { AppComponent } from 'src/app/app.component';
import { NotifierService } from 'angular-notifier';
import { ITokens, UserLogin } from 'src/app/types/userLogin';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  public show = false;
  public userlogin!: UserLogin;
  public showPassword: boolean = false;
  private readonly notifier!: NotifierService;
  constructor(public route: Router,
    public loginService: LoginService,
    public appComponent: AppComponent,
    public notifierService: NotifierService,
    public loaderService: LoaderService) {
    this.notifier = notifierService;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  submit(f: NgForm) {
    this.loaderService.ShowLoader();
    const { username, password } = f.value;
    this.loginService.login<ITokens>({ username, password }).subscribe((res) => {
      this.loginService.updateToken(res);
      this.route.navigate(['/dashboard']);
      this.notifier.show({
        type: 'success',
        message: 'login successfully',
        id: 'THAT_NOTIFICATION_ID',

      });
      this.loaderService.HideLoader();
      setTimeout(() => {
        this.notifier.hide('THAT_NOTIFICATION_ID');
      }, 2000);

    }, err => {
      if (err.error) {
        this.notifier.notify('error', 'Invalid Password');
      }
      this.loaderService.HideLoader();
    })

  }



}
