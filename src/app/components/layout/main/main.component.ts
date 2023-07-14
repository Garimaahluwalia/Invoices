import { Component,OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnInit  {

  public isActiveSideBar:Boolean = false;

  constructor(private sidebaeService:SidebarService) { }


  ngOnInit(): void {
    this.sidebaeService.isMobile.subscribe((rs)=>{
      this.isActiveSideBar=rs;
  });
  }
  
  
}
