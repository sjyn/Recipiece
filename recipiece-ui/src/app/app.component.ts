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
  title = 'recipiece-ui';

  readonly actions: MatFabMenu[] = [
    {icon: 'info', id: 3, tooltip: 'About', tooltipPosition: 'left'},
    {icon: 'account_circle', id: 2, tooltip: 'Account', tooltipPosition: 'left'},
    {icon: 'create', id: 1, tooltip: 'Create Recipe', tooltipPosition: 'left'},
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
    switch (actionId) {
      case 1:
        this.router.navigate(['config']);
        break;
    }
  }

  public maybeGoHome() {
    this.router.navigate(['dashboard']);
  }
}
