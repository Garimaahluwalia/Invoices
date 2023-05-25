import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/app/services/auth/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  ngOnInit(): void {
   
  }

  constructor(public signupService: SignupService, public route: Router, public router: ActivatedRoute){}

  
  submit(f:NgForm){

  }
}
