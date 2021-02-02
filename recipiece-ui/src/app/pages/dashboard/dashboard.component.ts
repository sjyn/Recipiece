import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiGlobalsService} from '../../services/ui-globals.service';
import {DashboardStateService} from './dashboard-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    public uiGlobals: UiGlobalsService,
    public dashboardState: DashboardStateService,
  ) {
  }

  ngOnInit(): void {
    this.uiGlobals.showDrawer = true;
  }

  ngOnDestroy() {
    this.uiGlobals.showDrawer = false;
  }

}
