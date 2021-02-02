import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UiGlobalsService {
  public drawerOpen: boolean;
  public showDrawer: boolean;

  public get showActions(): boolean {
    return !!this.storage.session?.token;
  }

  constructor(
    private storage: StorageService,
  ) {
    this.drawerOpen = false;
    this.showDrawer = false;
  }
}
