import { Injectable } from '@angular/core';
import { Teacher } from '../teacher/teacher.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { RootURL } from './RootURL.model';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  AddTeacher(teacher: Teacher) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/Teachers', teacher, { headers: reqHeader });

  }
  GetTeachers():Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(RootURL.URl + '/api/Teachers');
  }
}
