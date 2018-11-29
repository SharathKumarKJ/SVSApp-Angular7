import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RootURL } from './RootURL.model';
import { ToastrService } from 'ngx-toastr';
import { TeacherSubject } from '../teacher-subject-detail/teacher-subject.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectDetailService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  AddTeacherSubject(teacherSubject: TeacherSubject) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/TeacherSubjectDetails', teacherSubject, { headers: reqHeader })
      .pipe(tap((teacherSubject: TeacherSubject) => {
        console.log("Teacher Subject Details Id : " + teacherSubject.Id + " Added successfully");
        this.showSuccess();
      }
      ),
        catchError(this.handleError<TeacherSubject>('TeacherSubjectDetails')));
    }

  GetTeacherSubject(): Observable<TeacherSubject[]> {
    return this.httpClient.get<TeacherSubject[]>(RootURL.URl + '/api/TeacherSubjectDetails')
      .pipe(tap(() => console.log('Fetched TeacherSubject')),
        catchError(this.handleError('GetTeacherSubject', [])));
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
