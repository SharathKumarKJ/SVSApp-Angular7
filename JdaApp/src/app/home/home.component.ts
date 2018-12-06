import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
   
  }
  
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


}
