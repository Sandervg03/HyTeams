import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css'
})
export class ActivateComponent implements OnInit {

  error: string | null = null;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  activateUser() {
    try {
      const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
      const activationCodeInput: HTMLInputElement = document.getElementById('activationCode') as HTMLInputElement;
      const password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
      const confirmPassword: HTMLInputElement = document.getElementById('confirmPassword') as HTMLInputElement;
      this.service.activateUser(emailInput.value, activationCodeInput.value, password.value, confirmPassword.value)
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
      }, (error: any) => {
        this.error = error.error;
      });
    } catch (error: any) {
      this.error = error.message;
    }
  }

}
