import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  public registerUser(user: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:4001/registerUser', user)
  }

  public activateUser(email: string, code: string, password: string, confirmPassword: string): Observable<any> {
    return this.http
      .post<any>('http://localhost:4001/activateUser', { _email: email, _code: code, _password: password, _confirmPassword: confirmPassword })
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http
      .post<boolean>('http://localhost:4001/isLoggedIn', { }, { withCredentials: true })
  }

  public loginUser(email: string, password: string): Observable<boolean> {
    return this.http
      .post<boolean>('http://localhost:4001/loginUser', { _email: email, _password: password }, { withCredentials: true })
  }

}
