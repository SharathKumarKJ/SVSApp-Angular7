import { Injectable } from '@angular/core';
import { Teacher } from '../teacher/teacher.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { RootURL } from './RootURL.model';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  AddTeacher(teacher: Teacher) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/Teachers', teacher, { headers: reqHeader })
      .pipe(tap((teacher: Teacher) => {

        console.log("Teacher Id : " + teacher.Id + " Added successfully");
        this.showSuccess();
      }),
        catchError(this.handleError<Teacher>('addTeacher')));

  }
  GetTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(RootURL.URl + '/api/Teachers')
      .pipe(tap(() => console.log('Fetched Teachers')),
        catchError(this.handleError('Teachers', [])));
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
