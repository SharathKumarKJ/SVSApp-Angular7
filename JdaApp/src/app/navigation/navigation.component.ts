import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private userService: UserService) {}
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


  OnMenuClick()
  {
    this.router.navigate(['/home']);
  }
 
}
