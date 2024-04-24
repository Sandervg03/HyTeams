import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http
      .get<boolean>('http://localhost:4001/isLoggedIn')
      .pipe(retry(3));
  }
}
