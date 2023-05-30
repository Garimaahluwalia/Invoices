import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit{
  public invoiceData : any ;
  constructor(){}
  ngOnInit(): void {
    
  }

  submit(f:NgForm){
    this.invoiceData = f.value;
    console.log(this.invoiceData, "invoiceData")
  }
 
}
