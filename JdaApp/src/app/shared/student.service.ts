import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Student } from '../student/student.model';
import { tap, catchError } from 'rxjs/operators';
import { RootURL } from './RootURL.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  AddStudent(student: Student) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/Students', student, { headers: reqHeader })
      .pipe(tap((student: Student) => {
        console.log("Student Id : " + student.Id + " Added successfully");
        this.showSuccess();
      }
      ),
        catchError(this.handleError<Student>('addStudent')));
  }

  UpdateStudent(student: Student): any {
    console.log(student.Id);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.put(RootURL.URl + '/api/Students/' + student.Id, student, { headers: reqHeader })
      .pipe(tap((student: Student) => {
        this.showSuccess();
      }
      ),
        catchError(this.handleError<Student>('UpdateStudent')));
  }



  GetStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(RootURL.URl + '/api/Students')
      .pipe(tap(() => console.log('Fetched Students')),
        catchError(this.handleError('GetStudent', [])));
  }

  GetStudent(id: number): Observable<Student> {
    const url = `${RootURL.URl + "/api/Students"}/${id}`;
    return this.httpClient.get<Student>(url)
      .pipe(tap(() => console.log('Fetched Student')),
        catchError(this.handleError<Student>(`Get Student id=${id}`))
      );
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
