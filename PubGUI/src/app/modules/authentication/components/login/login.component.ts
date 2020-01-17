import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthenticationService, private router: Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
  }

  loginUser() {
    console.log("Login user", this.user);
    this.authService.setUser(this.user.userId);
    this.authService.loginUser(this.user).subscribe(data => {
      console.log("Login successful");
      if (data['token']) {
        this.authService.setToken(data['token']);
        
        console.log("Going to movies");
        this.router.navigate(['pubg/tournaments']);
      }

    }),(error:HttpErrorResponse)=>{
      this.snackbar.open("Wrong credentials",'',{
        duration:2000
      });
    }
  }
}
