import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Student } from '../student/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  readonly rootUrl = "http://localhost:54937";
  constructor(private httpClient: HttpClient) { }


  AddStudent(student: Student) {
    alert(student);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(this.rootUrl + '/api/Students', student, { headers: reqHeader });

  }
  GetStudents():Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.rootUrl + '/api/Students');
  }
}
