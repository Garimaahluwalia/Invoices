import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { AppComponent } from 'src/app/app.component';
import { NotifierService } from 'angular-notifier';
import { UserLogin } from 'src/app/types/userLogin';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  userlogin: any;
  showPassword: boolean = false;
  private readonly notifier!: NotifierService;
  constructor(public route: Router, public loginService: LoginService, public appcomponent: AppComponent, public notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  ngOnInit(): void {

  }



  submit(f: NgForm) {
    const username = f.value.username;
    const password = f.value.password;
  
   this.loginService.login({username: f.value.username, password: f.value.password}).subscribe((res:UserLogin)=> {
    this.loginService.updateLoginUser(res);
    this.route.navigate(['/dashboard']);
   }, err => {
    if(err.error){
      this.notifier.notify('error', 'Invalid email address');
    }
   })
  }

  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}
