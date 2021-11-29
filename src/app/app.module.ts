import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import {AccountComponent} from './account/account.component';
import {MatCardModule} from "@angular/material/card";
import {NavbarComponent} from './navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {CardComponent} from './card/card.component';
import {CardListComponent} from './card-list/card-list.component';
import {MatListModule} from "@angular/material/list";
import {SearchUserComponent} from './search-user/search-user.component';
import {UserMinimizedComponent} from './user-minimized/user-minimized.component';
import {DeleteComponent} from './delete/delete.component';
import {AuthFormComponent} from './auth-form/auth-form.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {UpdateFormComponent} from './update-form/update-form.component';
import {UpdatePasswordFormComponent} from "./update-password-form/update-password-form.component";
import {PublicProfileComponent} from './public-profile/public-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent,
    AccountComponent,
    NavbarComponent,
    CardComponent,
    CardListComponent,
    SearchUserComponent,
    UserMinimizedComponent,
    DeleteComponent,
    AuthFormComponent,
    UpdateFormComponent,
    UpdatePasswordFormComponent,
    PublicProfileComponent,
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
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function tokenGetter() {
  return window.localStorage.getItem("access_token");
}

