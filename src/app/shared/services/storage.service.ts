import {Injectable} from "@angular/core";
import {User} from "../types/user.type";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveToken(token: string){
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.setItem('auth-token', token);
  }

  saveUser(user: User | undefined){
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
  }

  getUser(): User{
    const user = window.sessionStorage.getItem('auth-user');
    return user ? JSON.parse(user) : {};
  }

  getToken(): string | null{
    return window.sessionStorage.getItem('auth-token');
  }

  logout() {
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.removeItem('auth-user');
  }
}
