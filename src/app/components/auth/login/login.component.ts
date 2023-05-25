import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { MainComponent } from '../../layout/main/main.component';
import { AppComponent } from 'src/app/app.component';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userlogin: any;
  private readonly notifier!: NotifierService;
  constructor(public route:Router, public loginService: LoginService, public notifyService:NotificationService, public appcomponent:AppComponent,public notifierService: NotifierService){
    this.notifier = notifierService;
  }
  ngOnInit(): void {
   
  }


  submit(f: NgForm) {
    const loginData = {
      username: f.value.username,
      password: f.value.password
    };
    console.log(loginData, "logindetails")
    this.loginService.login(loginData).subscribe(
      (res: any) => {
        this.userlogin = res;
        console.log(this.userlogin, "userlogin");
        this.route.navigate(["/dashboard"]);
      },
      (error: any) => {
        console.error(error);
        if(error.error){
          this.notifier.notify('error', 'Invalid email address');
        }
       
      }
    );
  }

}
