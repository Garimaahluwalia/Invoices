import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-save-invoice-page',
  templateUrl: './save-invoice-page.component.html',
  styleUrls: ['./save-invoice-page.component.css']
})
export class SaveInvoicePageComponent implements OnInit{
  private _id: any;
  constructor(public route: Router , public router : ActivatedRoute){

  }
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this._id = params['id'];
   
    });
  }
 
}
