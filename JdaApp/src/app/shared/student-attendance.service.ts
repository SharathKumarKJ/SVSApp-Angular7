import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { RootURL } from './RootURL.model';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StudentAttendance } from '../student-attendance/student-attendance.model';
import { Attendance } from '../student-attendance/attendance.model';
import { AttendanceParam } from '../student-attendance-list/student-AttendanceParam.model';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    console.log('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
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

  GetAttendances(): Observable<Attendance[]> {
    return this.httpClient.get<Attendance[]>(RootURL.URl + '/api/StudentAttendances')
      .pipe(tap(() => console.log('Fetched Attendance')),
        catchError(this.handleError('Attendance', [])));
  }

  GetAttendanceByDate(date: string): Observable<Attendance[]> {
    const url = `${RootURL.URl + "/api/GetAttendanceByDate"}/${date}`;
    return this.httpClient.get<Attendance[]>(url)
      .pipe(tap(() => console.log('Fetched Attendance')),
        catchError(this.handleError('GetAttendance', [])));
  }



  GetAttendanceByParam(attendanceParam: AttendanceParam): Observable<Attendance[]> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post<Attendance[]>(RootURL.URl + '/api/GetAttendanceByParam', attendanceParam, { headers: reqHeader })
      .pipe(tap(() => console.log('Fetched Attendance')),
        catchError(this.handleError('GetAttendanceByParam', [])));
  }

  GetAttendance(id: number): Observable<Attendance> {
    const url = `${RootURL.URl + "/api/Attendance"}/${id}`;
    return this.httpClient.get<Attendance>(url)
      .pipe(tap(() => console.log('Fetched Attendance')),
        catchError(this.handleError<Attendance>(`Get Attendance id=${id}`))
      );
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

