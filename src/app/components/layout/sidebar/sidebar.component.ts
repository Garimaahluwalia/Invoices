import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public router: Router) { }

  quotations() {
    this.router.navigate(['/add-invoice'], { queryParams: { category: 'Quotations' } });
  }

}
