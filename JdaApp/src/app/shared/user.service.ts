import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { User } from './user.model';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({

  providedIn: 'root'
})

export class UserService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.httpClient.post(RootURL.URl + '/api/User/Register', body, { headers: reqHeader })
      .pipe(tap((user: User) => console.log("Register Successfully...")),
        catchError(this.handleError<User>('Register')));

  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.httpClient.post(RootURL.URl + '/token', data, { headers: reqHeader })
    .pipe(tap((user: User) => console.log("Authentication successful...")),
    catchError(this.handleError<User>('Authentication')));
  }

  getUserClaims() {
    return this.httpClient.get(RootURL.URl + '/api/GetUserClaims')
    .pipe(tap(() => console.log('Fetched User Claims')),
    catchError(this.handleError('User', [])));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
