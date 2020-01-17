import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRouterModule } from './authentication-router.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    AuthenticationRouterModule,
    FormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [AuthenticationService],
  exports: [
    SharedModule,
    HttpClientModule,
    AuthenticationRouterModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
