import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  error: string | null = null;

  constructor(private service: UserService, private router: Router) { };

  ngOnInit(): void {
  }

  loginUser() {
    try {
      const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
      const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
      this.service.loginUser(emailInput.value, passwordInput.value)
        .subscribe((response: boolean) => { 
          this.router.navigate(['/home']); }, 
        (error: any) => { 
          this.error = error.error; 
        });
    } catch (error: any) {
      this.error = error.message;
    }
  }

}
