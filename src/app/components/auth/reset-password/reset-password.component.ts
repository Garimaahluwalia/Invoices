import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  constructor(public http: HttpClientModule){}
  ngOnInit(): void {
    
  }
  reset(){

  }
  // onSubmit(email: string): void {
  //   const payload = { email: email };
  //   this.http.post('/api/reset-password', payload).subscribe(
  //     () => {
        
  //     },
  //     (error) => {
        
  //     }
  //   );
  // }
}
