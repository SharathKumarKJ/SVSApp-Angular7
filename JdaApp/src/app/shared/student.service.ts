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

  GetStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(RootURL.URl + '/api/Students')
      .pipe(tap(() => console.log('Fetched Students')),
        catchError(this.handleError('GetStudent', [])));
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
