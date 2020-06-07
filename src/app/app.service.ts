import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getIpAdress(): Observable<any> {
    return this.httpClient.get<any>('http://httpbin.org/ip')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getLocation(ip: string): Observable<any> {
    return this.httpClient.get<any>(`http://ip-api.com/json/${ip}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getDolarToday(date: string): Observable<any> {
    return this.httpClient.get<any>(`https://economia.awesomeapi.com.br/all/USD-BRL`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
