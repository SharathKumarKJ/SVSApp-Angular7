import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StudentMarks, StudentmarksParams } from '../student-marks/StudentMarks.model';


@Injectable({
  providedIn: 'root'
})
export class StudentMarksService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    console.log('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  AddStudentMarks(studentMarks: StudentMarks) {


    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/StudentMarksSheets', studentMarks, { headers: reqHeader })
      .pipe(tap(() => {
        console.log("Student Attendance Added successfully");
        this.showSuccess();
      }
      ),
        catchError(this.handleError<string>('addStudent')));
  }

  GetStudentmarks(studentmarksParams:StudentmarksParams): Observable<StudentMarks[]> {
    console.log(studentmarksParams);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post<StudentMarks[]>(RootURL.URl + '/api/GetStudentMarksSheets', studentmarksParams, { headers: reqHeader })
      .pipe(tap(() => console.log('Fetched GetStudentMarksSheets')),
        catchError(this.handleError('GetStudentMarksSheets', [])));
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}

