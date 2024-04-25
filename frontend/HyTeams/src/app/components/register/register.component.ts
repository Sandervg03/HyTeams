import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  registerUser() {
    console.log('Registering user')
    try {
      this.userService.registerUser(new User('username', 'email'))
      .subscribe((data) => { data._email && data._username ? this.router.navigate(['/login']) : console.log('Incorrect data') });
    } catch (error: any) {
      const element: HTMLElement = document.getElementById('errorHandling') as HTMLElement;
      element.innerHTML = error.message;
    }
  }

}
