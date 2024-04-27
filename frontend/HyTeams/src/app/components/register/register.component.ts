import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import * as validator from 'email-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  error: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  registerUser() {
    try {
      const element: HTMLElement = document.getElementById('errorHandling') as HTMLElement;
      const emailElement: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
      const usernameElement: HTMLInputElement = document.getElementById('username') as HTMLInputElement;
      this.userService.registerUser(new User(usernameElement.value, emailElement.value))
        .subscribe((data) => {
          this.router.navigate(['/register-success']);
        }, (error) => {
          this.error = error.error;
        });
    } catch (error: any) {
      const element: HTMLElement = document.getElementById('errorHandling') as HTMLElement;
      this.error = error.message;
    }
  }
}
