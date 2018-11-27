import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Subject } from '../subject/subject.model';

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
    return this.httpClient.post(this.rootUrl + '/api/Subjects', body, { headers: reqHeader });

  }
  GetSubjects():Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.rootUrl + '/api/Subjects');
  }
 

}
