import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
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
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  private readonly notifier!: NotifierService;


  constructor(public loginService: LoginService,
    public router: Router,
    public sidebaeService: SidebarService,
    public notifierService: NotifierService
    ) { this.notifier = notifierService; }


  ngOnInit(): void {

  }

  logout() {
    const token = AUTHORIZATION_TOKEN;
    this.loginService.userLogout(token).subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        this.notifier.show({
          type: 'success',
          message: 'logout successfully',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(() => {
          this.notifier.hide('THAT_NOTIFICATION_ID');
        }, 2000);
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