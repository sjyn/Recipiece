import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StorageService} from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequireAuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.storageService.loggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
