import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { User } from './user.model';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({

  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Role:user.Role,
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.httpClient.post(RootURL.URl + '/api/User/Register', body, { headers: reqHeader })
      .pipe(tap(() => {
        console.log("Register Successfully...");
        this.showSuccess();
      }),
        catchError(this.handleError<User>('Register')));

  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.httpClient.post(RootURL.URl + '/token', data, { headers: reqHeader })
      .pipe(tap(() => console.log("Authentication successful...")),
        catchError(this.handleError<User>('Authentication')));
  }

  getUserClaims() {
    return this.httpClient.get(RootURL.URl + '/api/GetUserClaims')
      .pipe(tap(() => console.log('Fetched User Claims')),
        catchError(this.handleError('User', [])));
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRole'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.showError(error);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
