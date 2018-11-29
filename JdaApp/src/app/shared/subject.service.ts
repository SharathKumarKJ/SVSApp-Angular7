import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Subject } from '../subject/subject.model';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }
  AddSubejct(subject: Subject) {
    const body: Subject = {
      Id: subject.Id,
      SubjectName: subject.SubjectName,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/Subjects', body, { headers: reqHeader })
      .pipe(tap((subject: Subject) => {
        console.log("Subject Id : " + subject.Id + " Added successfully");
        this.showSuccess();
      }),
        catchError(this.handleError<Subject>('addSubject')));
  }


  GetSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(RootURL.URl + '/api/Subjects')
      .pipe(tap(() => console.log('Fetched Subjects')),
        catchError(this.handleError('Subjects', [])));
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
