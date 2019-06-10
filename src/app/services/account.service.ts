import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //endpoint = 'http://localhost:3000';
  endpoint = 'http://localhost:8080/myapp';

  constructor(private http: HttpClient) { }

   httpOptions = {
      headers: new HttpHeaders({
           'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
      })
  }
  

  
  getCustomerAccount(id: number): Observable<Account[]> {
      return this.http.get<Account[]>(this.endpoint + '/accounts?customerId='+id, this.httpOptions)
          .pipe(
              catchError(this.handleError)
          )
  }

  
  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(this.endpoint + '/accounts/edit', JSON.stringify(account), this.httpOptions)
        .pipe(
            catchError(this.handleError)
        )
}

  
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
}
  
}
