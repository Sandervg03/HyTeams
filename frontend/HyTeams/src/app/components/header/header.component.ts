import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.userService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
      this.addNavigation();
    });
  }

  addNavigation() {
    if (this.loggedIn == true) {
      const profileAnchor: HTMLAnchorElement = this.document.querySelector(
        '#profile'
      ) as HTMLAnchorElement;
      profileAnchor.style.display = 'block';
    } else {
      const loginAnchor: HTMLAnchorElement = this.document.querySelector(
        '#login'
      ) as HTMLAnchorElement;
      loginAnchor.style.display = 'block';
    }
  }
}
