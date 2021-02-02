import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../api/user.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.sass'],
})
export class CreateAccountComponent implements OnInit {
  public username: string;
  public confirmUsername: string;
  public password: string;
  public confirmPassword: string;
  public rememberMe: boolean;

  public get valid(): boolean {
    return !!this.username && !!this.confirmUsername &&
      !!this.password && !!this.confirmPassword &&
      this.username.trim() !== '' && this.username === this.confirmUsername &&
      this.password.length > 6 && this.password === this.confirmPassword;
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  public createAccount() {
    this.userService.createUser({email: this.username, password: this.password}, this.rememberMe)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['dashboard']);
      });
  }

}
