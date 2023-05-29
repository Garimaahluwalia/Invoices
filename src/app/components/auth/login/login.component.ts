import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { AppComponent } from 'src/app/app.component';
import { NotifierService } from 'angular-notifier';
import { LoginDirective } from 'src/app/directives/login.directive';
import { UserLogin } from 'src/app/types/userLogin';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  @ViewChild(LoginDirective, { static: false }) LoginDirective!: LoginDirective;
  userlogin: any;
  private readonly notifier!: NotifierService;
  constructor(public route: Router, public loginService: LoginService, public notifyService: NotificationService, public appcomponent: AppComponent, public notifierService: NotifierService) {
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


}
