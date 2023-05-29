import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SignupService } from 'src/app/services/auth/signup.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;

  signupData: any;

  private readonly notifier!: NotifierService;
  ngOnInit(): void {

  }

  constructor(public signupService: SignupService, public route: Router, public router: ActivatedRoute, public notifierService: NotifierService, private formBuilder: FormBuilder) {
    this.notifier = notifierService;


  }


  submit(f: NgForm) {
    const signupData = {
      username: f.value.username,
      email: f.value.email,
      password: f.value.password
    };
    console.log(signupData, "signupData")

    this.signupService.signup(signupData).subscribe((res: any) => {
      this.signupData = res;
      this.signupForm.reset();
      this.notifier.notify('success', 'signup successfully ');
      console.log(this.signupData, "signUp")

    }, (error: any) => {
      console.error(error);
      if (error.error) {
        this.notifier.notify('error', 'Invalid ');
      }
    })


  }
}
