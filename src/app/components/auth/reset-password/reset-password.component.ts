import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from 'src/app/services/auth/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetResponse!: { [k: string]: string };

  constructor(public http: HttpClientModule,
    public loginService: LoginService) { }

  ngOnInit(): void { }
  submit(resetForm: NgForm) {
    const email = resetForm.value.email;
    this.loginService.forgotPassword(email).subscribe(
      (res: { [k: string]: string }) => {
        this.resetResponse = res;
      },
      (err) => {
        if (err.error) {
          console.log("error");
        }
      }
    );
  }
}

