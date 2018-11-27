import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Subject } from '../subject/subject.model';
import { RootURL } from './RootURL.model';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

  readonly rootUrl = "http://localhost:54937";

  constructor(private httpClient: HttpClient) { }

  AddSubejct(subject: Subject) {
    const body: Subject = {
      Id: subject.Id,
      SubjectName: subject.SubjectName,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.post(RootURL.URl + '/api/Subjects', body, { headers: reqHeader });

  }
  GetSubjects():Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(RootURL.URl + '/api/Subjects');
  }
 

}
