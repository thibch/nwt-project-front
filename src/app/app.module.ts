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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import {JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import { AccountComponent } from './account/account.component';
import {MatCardModule} from "@angular/material/card";
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import {MatListModule} from "@angular/material/list";
import { SearchUserComponent } from './search-user/search-user.component';
import { UserMinimizedComponent } from './user-minimized/user-minimized.component';
import { DeleteComponent } from './delete/delete.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { RollComponent } from './roll/roll.component';

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
    DeleteFormComponent,
    RollComponent
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
    MatListModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function tokenGetter() {
  return window.localStorage.getItem("access_token");
}

