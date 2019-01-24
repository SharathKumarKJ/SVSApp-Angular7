import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StudentAttendance } from '../student-attendance/student-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }


  AddStudentAttendance(classId: number, studentIds: string) {
    var data = new StudentAttendance();
    data.ClassId = classId;
    data.StudentIds = studentIds;
    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/StudentAttendanceByClass', data, { headers: reqHeader })
      .pipe(tap(() => {
        console.log("Student Attendance Added successfully");
        this.showSuccess();
      }
      ),
        catchError(this.handleError<string>('addStudent')));
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

