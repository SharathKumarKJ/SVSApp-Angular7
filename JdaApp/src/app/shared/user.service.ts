import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({

  providedIn: 'root'
})

export class UserService {

  readonly rootUrl = "http://localhost:54937";

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
    return this.httpClient.post(this.rootUrl + '/api/User/Register', body, { headers: reqHeader });

  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.httpClient.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
    return this.httpClient.get(this.rootUrl + '/api/GetUserClaims');
  }

  
}
