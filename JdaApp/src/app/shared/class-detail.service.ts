import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Class } from '../class-detail/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassDetailService {
  readonly rootUrl = "http://localhost:54937";
  constructor(private httpClient: HttpClient) { }

  AddClassDetail(classDetail: Class) {
    const body: Class = {
      Id: classDetail.Id,
      ClassName: classDetail.ClassName,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.post(this.rootUrl + '/api/ClassDetails', body, { headers: reqHeader });

  }

  getClasses() :Observable<Class[]> {
    return this.httpClient.get<Class[]>(this.rootUrl + '/api/ClassDetails');
  }
}
