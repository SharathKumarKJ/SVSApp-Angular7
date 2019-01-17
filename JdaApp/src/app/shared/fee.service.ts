import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RootURL } from './RootURL.model';
import { ToastrService } from 'ngx-toastr';
import { Fee } from '../fee-detail/fee.model';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Error : ' + error.error.ExceptionMessage + error.error.ExceptionType);
  }

  AddFee(fee: Fee) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post(RootURL.URl + '/api/FeeDetails', fee, { headers: reqHeader })
      .pipe(tap((fee: Fee) => {
        console.log("Fee Id : " + fee.Id + " Added successfully");
        this.showSuccess();
      }
      ),
        catchError(this.handleError<Fee>('Fee')));
  }

  GetFees(): Observable<Fee[]> {
    return this.httpClient.get<Fee[]>(RootURL.URl + '/api/FeeDetails')
      .pipe(tap(() => console.log('Fetched Fees')),
        catchError(this.handleError('GetFees', [])));
  }

  GetFeesByClass(classId :number): Observable<Fee[]> {
    const url = `${RootURL.URl + "/api/FeesByClass"}/${classId}`;
    return this.httpClient.get<Fee[]>(url)
      .pipe(tap(() => console.log('Fetched Fees')),
        catchError(this.handleError('GetFee', [])));
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
