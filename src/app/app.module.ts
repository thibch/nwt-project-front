import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {UserComponent} from './user/user.component';
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterComponent} from './register/register.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import {JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import { AccountComponent } from './account/account.component';
import {MatCardModule} from "@angular/material/card";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent,
    AccountComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost"]
      }
    }),
    MatCardModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function tokenGetter() {
  return window.localStorage.getItem("access_token");
}

