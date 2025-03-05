import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  username!: string;
  email!: string;
  password!: string;
  phone: number = 0;
  registerActive: boolean = false;
  loginActive: boolean = true;
  successMessage: string = "";
  errorMessage: string = "";


  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.loginEvent.subscribe(() => {
      this.loginActive = true;
      this.registerActive = false;
      this.username = "";
      this.email = "";
      this.password = "";
      this.successMessage = "";
      this.errorMessage = "";
    });
    this.sharedService.registerEvent.subscribe(() => {
      this.loginActive = false;
      this.registerActive = true;
      this.username = "";
      this.email = "";
      this.password = "";
      this.successMessage = "";
      this.errorMessage = "";
    });
  }


  login() : void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.userService.login(credentials).subscribe(
      (response: any) => {
        this.loginActive = false;
        this.registerActive = false;
        this.router.navigate([`/verify/${response.userId}`]);
        this.successMessage = response.message;
        this.errorMessage = "";
      },
      (error: any) => {
        console.error("Error logging in:", error);
        this.errorMessage = "Login unsuccessful!! please reload and try in incognito tab",
        this.successMessage = ""
      }
    );
  }

  register() :void {
    const userData = {
      username : this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
    };

    this.userService.register(userData).subscribe(
      (response: any) => {
        this.loginActive = true;
        this.registerActive = false;
        this.successMessage = response.message;
        this.errorMessage = "";
      },
      (error: any) => {
        this.errorMessage = "Error registering the user!",
        this.successMessage = ""
      }
    );
  }
}
