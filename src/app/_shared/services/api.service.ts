import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { UtilService } from '../services/util.service';
import { DialogData } from '../models/util';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint = this.config.prodApiUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private util: UtilService, private config: Config) {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      this.apiEndpoint = config.devApiUrl;
    }
  }

  private checkForError(err: HttpErrorResponse) {
    console.log(err);
    let message = '';
    if (err.statusText != null || err.statusText !== '') {
      message = err.statusText;
    }
    if (err.error != null) {
      try {
        message = err.error.message;
      } catch (err) {
      }
    }
    if (message == null || message === '') {
      message = 'An error occurred while processing your request.';
    }
    // manually handle certain errors
    if (err.status === 401 || err.status === 200) {
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        // do nothing
      } else {
        message = 'Your session has timed out.  You will not be redirected to the Sign-In page.';
      }
    }
    const data = {
      title: 'Error',
      body: message,
      confirmButton: 'OK'
    } as DialogData;
    setTimeout(() => {
      this.util.openDialog(data, (e: any) => {
        if (message.indexOf('timed') !== -1) {
          window.location.href = '/home';
        }
      });
    });

    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      return throwError(err.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);

      const error = new Error(message);
      error.message = message;
      return throwError(error);
    }
  }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.apiEndpoint}${path}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.checkForError)
    );
  }

  public put<T = any>(path: string, body: T) {
    return this.http.put<any>(`${this.apiEndpoint}${path}`, JSON.stringify(body), { headers: this.headers }).pipe(
      catchError(this.checkForError)
    );
  }

  public post<T = any>(path: string, body: T) {
    return this.http.post<any>(`${this.apiEndpoint}${path}`, JSON.stringify(body), { headers: this.headers }).pipe(
      catchError(this.checkForError)
    );
  }

  public delete(path: string) {
    return this.http.delete(`${this.apiEndpoint}${path}`, { headers: this.headers }).pipe(
      catchError(this.checkForError)
    );
  }

  public signIn<T = any>(body: T) {
    return this.http.post<any>(this.apiEndpoint + 'User/SignIn', JSON.stringify(body), { headers: this.headers }).pipe(
      retry(3), // Retry up to 3 times before failing
      map(data => {
        // tslint:disable-next-line: no-string-literal
        const currentUser: User = data['data'] as User;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return data;
      }),
      catchError(this.checkForError)
    );
  }

  public signOut(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
