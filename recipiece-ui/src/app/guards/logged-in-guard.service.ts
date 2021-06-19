import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StorageService} from '../services/storage.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!environment.desktop) {
      if (this.storage.loggedIn) {
        this.router.navigate(['dashboard']);
        return false;
      }
    }
    return true;
  }

}
