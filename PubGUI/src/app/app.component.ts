import { Component } from '@angular/core';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PubGUI';

  isLoggedIn: boolean = false;

  userName: any;

  constructor(private auth: AuthenticationService, private routes: Router) { }



  ngOnInit() {

    this.isLoggedIn = this.auth.isTokenExpired();

    if (localStorage.getItem("userId")) {
      this.userName = localStorage.getItem("userId");
    }
  }

  logout() {
    this.auth.deleteToken();
    this.toggleLoggedIn(false);
    this.routes.navigate(['/login']);
  }

  toggleLoggedIn(status) {
    this.isLoggedIn = true;
  }


}
