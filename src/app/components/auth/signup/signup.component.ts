import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SignupService } from 'src/app/services/auth/signup.service';
import { ISignUp } from 'src/app/types/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;

  public signupData!: ISignUp;
  public email !: string;
  public username !: string;
  public password!: string;
  public showPassword: boolean = false;
  private readonly notifier!: NotifierService;

  constructor(public signupService: SignupService,
    public route: Router, public router: ActivatedRoute,
    public notifierService: NotifierService,
 ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void { }

  submit(f: NgForm) {
    this.username = f.value.username,
      this.email = f.value.email,
      this.password = f.value.password

    this.signupService.signUp({ username: this.username, email: this.email, password: this.password }).subscribe((res: ISignUp) => {
      this.signupData = res;
      this.signupForm.reset();
      this.notifier.notify('success', 'signup successfully ');

    }, (error: any) => {
      console.error(error);
      if (error.error) {
        this.notifier.notify('error', 'Invalid ');
      }
    })


  }

}
