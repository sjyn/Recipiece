import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../api/user.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.sass'],
})
export class PasswordChangeComponent implements OnInit {
  public oldPassword: string;
  public newPassword: string;
  public confNewPassword: string;

  public get disabled(): boolean {
    return this.oldPassword.trim() === '' ||
      this.newPassword.trim() === '' ||
      this.confNewPassword.trim() === '' ||
      this.newPassword !== this.confNewPassword;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.oldPassword = '';
    this.newPassword = '';
    this.confNewPassword = '';
  }

  public requestPasswordChange() {
    this.userService.changePassword(this.oldPassword, this.newPassword)
      .pipe(take(1))
      .subscribe(() => {
        // api takes care of logging out everywhere, so just kick them back
        this.storageService.logoutUser();
        this.router.navigate(['login']);
      }, () => {

      });
  }

}
