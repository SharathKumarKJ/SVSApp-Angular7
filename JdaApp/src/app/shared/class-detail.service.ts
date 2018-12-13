import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable, of, Observable } from 'rxjs';
import { Class } from '../class-detail/class.model';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClassDetailService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }


  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  AddClassDetail(classDetail: Class) {
  
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/ClassDetails', classDetail, { headers: reqHeader })
      .pipe(tap((classDetail: Class) => {
        console.log("class Detail Id : " + classDetail.Id + " Added successfully");
        this.showSuccess();
      }),
        catchError(this.handleError<Class>('addStudent')));
  }

  getClasses(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(RootURL.URl + '/api/ClassDetails')
      .pipe(tap(() => console.log('Fetched Classes')),
        catchError(this.handleError('Classes', [])));
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
