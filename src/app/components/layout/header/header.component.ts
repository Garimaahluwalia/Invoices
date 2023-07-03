import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('mobileNav', { static: true }) mobileNav!: ElementRef;
  public isActiveSideBar: Boolean = false;


  constructor(public loginService: LoginService,
    public router: Router,
    public sidebaeService: SidebarService) { }


  ngOnInit(): void {

  }

  logout() {
    const token = AUTHORIZATION_TOKEN;
    this.loginService.userLogout(token).subscribe(
      () => {
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
    this.isActiveSideBar = !this.isActiveSideBar
  }

  triggerButtonClick() {
    this.mobileNav.nativeElement.click();
  }

}