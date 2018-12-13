import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserClaim } from '../shared/userClaims.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnDestroy, OnInit {

  userClaim: UserClaim = {
    UserName: null,
    FirstName: null,
    LastName: null,
    LoggedOn: null,
    Email: null
  };

  ngOnInit(): void {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaim = data;
    });
  }
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  options: FormGroup;


  private _mobileQueryListener: () => void;

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private router: Router, private userService: UserService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


  OnMenuClick() {
    this.router.navigate(['/home']);
  }

}
