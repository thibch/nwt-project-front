import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {AccountComponent} from "./account/account.component";
import {SearchUserComponent} from "./search-user/search-user.component";
import {DeleteComponent} from "./delete/delete.component";
import {CardListComponent} from "./card-list/card-list.component";
import {PublicProfileComponent} from "./public-profile/public-profile.component";
import {MyCardsComponent} from "./my-cards/my-cards.component";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:id/profile', component: PublicProfileComponent},
  {path: 'profile', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchUserComponent},
  {path: 'delete', component: DeleteComponent, canActivate: [AuthGuard]},
  {path: 'cards', component: CardListComponent, canActivate: [AuthGuard]},
  {path: 'mycards', component: MyCardsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
