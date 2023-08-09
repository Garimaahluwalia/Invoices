import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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

  constructor(public loginService: LoginService, public loaderService: LoaderService) { }


  ngOnInit() {
    this.loginService.getDashboardCounts().pipe(takeUntil(this.destroyed)).subscribe((res: IDashboardCounts) => {
      this.loaderService.ShowLoader();
      this.dashboardCount = res;
      this.loaderService.HideLoader();
    })
  }
  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
