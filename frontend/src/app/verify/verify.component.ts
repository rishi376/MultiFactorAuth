import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  userId: string = "";
  code: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params["id"];
    });
  }

  onVerify(): void {
    this.userService.verifyCode(this.userId, this.code).subscribe({
      next: (response: any) => {
        console.log("Verification successful", response);
        this.errorMessage = "";
        const token = response.token;
        localStorage.setItem("token", token);
        this.userService.setAuthenticationStatus(true);
        this.userService.emitLoggedInEvent();
        this.successMessage = response.message;
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
