import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private matdailog:MatDialog) {}

  openDailog(){
    this.matdailog.open(RegistrationComponent,{
      width:"50%",
    })
  }

 
 

}
