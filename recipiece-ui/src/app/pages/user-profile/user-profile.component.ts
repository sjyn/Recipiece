import {Component, OnInit} from '@angular/core';
import {UserService} from '../../api/user.service';
import {IUser} from '../../api/model/user';
import {StorageService} from '../../services/storage.service';
import {switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteAccountModalComponent} from './modals/delete-account-modal/delete-account-modal.component';
import {of} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
})
export class UserProfileComponent implements OnInit {
  public user: Partial<IUser>;
  public loading: boolean;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private modal: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getById(this.storageService.session._id)
      .pipe(take(1))
      .subscribe((user: IUser) => {
        this.user = user;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  public logoutUser() {
    this.userService.logoutUser()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['login']);
      }, () => {

      });
  }

  public logoutEverywhere() {
    this.userService.logoutEverywhere()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['login']);
      }, () => {

      });
  }

  public changePassword() {
    this.router.navigate(['profile', 'password-change']);
  }

  public deleteAccount() {
    const modalRef = this.modal.open(DeleteAccountModalComponent, {data: {email: this.user.email}});
    modalRef.afterClosed()
      .pipe(
        take(1),
        switchMap((shouldDelete: boolean) => {
          if (shouldDelete === true) {
            return this.userService.delete(this.user._id);
          } else {
            return of(null);
          }
        }),
      )
      .subscribe(() => {
        this.router.navigate(['login']);
      }, (err) => {

      });
  }

}
