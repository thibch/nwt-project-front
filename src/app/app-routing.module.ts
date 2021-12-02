import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {AccountComponent} from "./account/account.component";
import {SearchUserComponent} from "./search-user/search-user.component";
import {DeleteComponent} from "./delete/delete.component";
import {CardsListComponent} from "./cards-list/cards-list.component";
import {PublicProfileComponent} from "./public-profile/public-profile.component";
import {UserCardsComponent} from "./shared/user-cards/user-cards.component";
import {TradesComponent} from "./trades/trades.component";
import {RollComponent} from "./roll/roll.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: CardsListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:id/profile', component: PublicProfileComponent},
  {path: 'profile', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchUserComponent},
  {path: 'roll', component: RollComponent},
  {path: 'delete', component: DeleteComponent, canActivate: [AuthGuard]},
  {path: 'cards', component: CardsListComponent, canActivate: [AuthGuard]},
  {path: 'mycards', component: UserCardsComponent, canActivate: [AuthGuard]},
  {path: 'trades', component: TradesComponent, canActivate: [AuthGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
