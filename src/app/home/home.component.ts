import {Component, OnInit} from '@angular/core';
import {LoginService} from "../shared/services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _loginService: LoginService) {
    _loginService.test().subscribe(
      data => {console.log(data)},
      error => {console.log(error)}
    )
  }

  ngOnInit(): void {
  }

}
