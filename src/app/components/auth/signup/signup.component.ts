import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SignupService } from 'src/app/services/auth/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupData: any;
  private readonly notifier!: NotifierService;
  ngOnInit(): void {
   
  }

  constructor(public signupService: SignupService, public route: Router, public router: ActivatedRoute,public notifierService: NotifierService){}


  submit(f:NgForm){
    const signupData = {
     name :f.value.name,
     Email : f.value.email,
     password : f.value.password
    };
    console.log(signupData, "signupData")

    this.signupService.signup(signupData).subscribe((res:any)=> {
      this.signupData = res;
      console.log(this.signupData, "signUp")
 
    }, (error:any) => {
      console.error(error);
      if(error.error){
        
      }
    })
   
    
  }
}
