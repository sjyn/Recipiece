import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../api/user.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

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

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.rememberMe = false;
  }

  public loginUser() {
    this.userService.loginUser(this.username, this.password, this.rememberMe)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['dashboard']);
      });
  }

}
