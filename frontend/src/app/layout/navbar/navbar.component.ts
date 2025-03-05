import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean = false;

  constructor(
    private router: Router, 
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userService.loggedInEvent.subscribe((data: any) => {
      this.isLoggedIn = true;
    });
    if( typeof localStorage !== "undefined" && localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    this.sharedService.triggerLogInEvent();
    this.router.navigate(["/"]);
  }

  register(): void {
    this.sharedService.triggerRegisterEvent();
    this.router.navigate(["/"]);
  }

  logout(): void {
    this.userService.setAuthenticationStatus(false);
    this.isLoggedIn = false;
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
}
