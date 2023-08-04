import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LoginService } from 'src/app/services/auth/login.service';
import { IDashboardCounts, IdashboardComponent } from 'src/app/types/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class dashboardComponent implements IdashboardComponent, OnInit {
  public dashboardCount: IDashboardCounts | null = null;
  public currentPage = 1;
  public itemsPerPage = 12;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(public loginService: LoginService) { }


  ngOnInit() {
    this.loginService.getDashboardCounts().pipe(takeUntil(this.destroyed)).subscribe((res:IDashboardCounts) => {
      this.dashboardCount = res;
      console.log(this.dashboardCount, "Dashboard")
    })
  }
  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
