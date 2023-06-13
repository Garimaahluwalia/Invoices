import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUTHORIZATION_TOKEN } from 'src/app/constants';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public loginService: LoginService, public router: Router) { }
  ngOnInit(): void {

  }
  logout() {
    const token = AUTHORIZATION_TOKEN;
     this.loginService.userLogout(token).subscribe(
      () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      },
      (error) => {
        
        console.error('Logout failed:', error);
        
      }
    );
  }
}
