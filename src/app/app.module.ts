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
import {LoginFormComponent} from './shared/login-form/login-form.component';
import {RegisterComponent} from './register/register.component';
import {RegisterFormComponent} from './shared/register-form/register-form.component';
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {AccountComponent} from './account/account.component';
import {MatCardModule} from "@angular/material/card";
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {CardComponent} from './shared/card/card.component';
import {CardsListComponent} from './cards-list/cards-list.component';
import {MatListModule} from "@angular/material/list";
import {SearchUserComponent} from './search-user/search-user.component';
import {UserMinimizedComponent} from './shared/user-minimized/user-minimized.component';
import {DeleteComponent} from './delete/delete.component';
import {AuthFormComponent} from './shared/auth-form/auth-form.component';
import {UpdateFormComponent} from './update-form/update-form.component';
import {UpdatePasswordFormComponent} from "./update-password-form/update-password-form.component";
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {UserCardsComponent} from './shared/user-cards/user-cards.component';
import {NotificationsViewComponent} from './notifications-view/notifications-view.component';
import {NotificationComponent} from './shared/notification/notification.component';
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {TradesComponent} from './trades/trades.component';
import {TradesOffersComponent} from './trades-offers/trades-offers.component';
import {UserTradesOffersComponent} from './user-trades-offers/user-trades-offers.component';
import {TradeComponent} from './shared/trade/trade.component';
import {CardsTradeComponent} from './cards-trade/cards-trade.component';
import {TradeSummaryComponent} from './trade-summary/trade-summary.component';
import {RollComponent} from './roll/roll.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatStepperModule} from "@angular/material/stepper";
import { NotFoundComponent } from './not-found/not-found.component';

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
    CardsListComponent,
    SearchUserComponent,
    UserMinimizedComponent,
    DeleteComponent,
    RollComponent,
    NotificationsViewComponent,
    NotificationComponent,
    AuthFormComponent,
    UpdateFormComponent,
    UpdatePasswordFormComponent,
    PublicProfileComponent,
    UserCardsComponent,
    TradesComponent,
    TradesOffersComponent,
    UserTradesOffersComponent,
    TradeComponent,
    CardsTradeComponent,
    TradeSummaryComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
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
    MatStepperModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function tokenGetter() {
  return window.localStorage.getItem("access_token");
}

