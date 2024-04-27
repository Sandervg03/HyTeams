import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public isLoggedIn(): Observable<boolean> {
    return this.http
     .get<boolean>('http://localhost:4001/isLoggedIn')
     .pipe(retry(3));
  }

  public registerUser(user: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:4001/registerUser', user)
      .pipe(retry(3));
  }

  public activateUser(email: string, code: string, password: string, confirmPassword: string): Observable<any> {
    return this.http
      .post<any>('http://localhost:4001/activateUser', {_email: email, _code: code, _password: password, _confirmPassword: confirmPassword})
      .pipe(retry(3));
  }
}
