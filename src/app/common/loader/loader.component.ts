import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { takeUntil } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  public show: boolean | undefined = false;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  constructor(
    public loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
    this.loaderService.loader.pipe(takeUntil(this.destroyed)).subscribe(show => {
      this.show = show;
      setTimeout(() => {
      }, 30000);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
