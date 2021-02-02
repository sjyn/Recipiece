import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public rememberMe: boolean;

  public get valid(): boolean {
    return !!this.username && !!this.password &&
      this.username.trim() !== '' && this.password.trim() !== '';
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  public loginUser() {

  }

}
