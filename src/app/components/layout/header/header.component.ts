import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AUTHORIZATION_TOKEN } from 'src/app/constants';
import { LoginService } from 'src/app/services/auth/login.service';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public loginService: LoginService, public router: Router,public sidebaeService:SidebarService) { }
  public isActiveSideBar:Boolean=false;
  @ViewChild('mobileNav', { static: true }) mobileNav!: ElementRef;
  ngOnInit(): void {
   
  }

  logout() {
    const token = AUTHORIZATION_TOKEN;
    this.loginService.userLogout(token).subscribe(
      () => {
        console.log('Logout successful');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
  

  toggleBodyClass() {
    this.sidebaeService.isMobile.emit(!this.isActiveSideBar);
    this.isActiveSideBar=!this.isActiveSideBar
  }

  triggerButtonClick() {
    this.mobileNav.nativeElement.click();
  }
// }
}