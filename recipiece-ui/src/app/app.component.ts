import {Component} from '@angular/core';
import {UiGlobalsService} from './services/ui-globals.service';
import {MatFabMenu} from '@angular-material-extensions/fab-menu';
import {Router} from '@angular/router';
import {StorageService} from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'recipiece';

  private readonly INFO_ID = 4;
  private readonly ACCOUNT_ID = 3;
  private readonly SHOPPING_ID = 2;
  private readonly CREATE_ID = 1;

  readonly actions: (MatFabMenu & {route: string})[] = [
    {icon: 'info', id: this.INFO_ID, tooltip: 'About', tooltipPosition: 'left', route: ''},
    {icon: 'account_circle', id: this.ACCOUNT_ID, tooltip: 'Account', tooltipPosition: 'left', route: 'profile'},
    {icon: 'shopping_cart', id: this.SHOPPING_ID, tooltip: 'Shopping', tooltipPosition: 'left', route: 'shopping-lists'},
    {icon: 'create', id: this.CREATE_ID, tooltip: 'Create Recipe', tooltipPosition: 'left', route: 'config'},
  ];

  constructor(
    public uiGlobals: UiGlobalsService,
    public storage: StorageService,
    private router: Router,
  ) {
  }

  public toggleDrawer() {
    this.uiGlobals.drawerOpen = !this.uiGlobals.drawerOpen;
  }

  public actionSelected(actionId: number) {
    const route = this.actions.find((menuItem) => menuItem.id === actionId);
    if(!!route) {
      this.router.navigate([route.route]);
    }
  }

  public maybeGoHome() {
    this.router.navigate(['dashboard']);
  }
}
