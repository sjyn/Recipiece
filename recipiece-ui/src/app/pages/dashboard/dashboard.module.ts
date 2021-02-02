import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ViewRecipeBookModule} from '../../components/view-recipe-book/view-recipe-book.module';
import {DashboardDrawerComponent} from './dashboard-drawer/dashboard-drawer.component';
import {DashboardStateService} from './dashboard-state.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {ViewAllRecipesComponent} from './view-all-recipes/view-all-recipes.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [DashboardComponent, DashboardDrawerComponent, ViewAllRecipesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    ViewRecipeBookModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
  ],
  providers: [
    DashboardStateService,
  ],
})
export class DashboardModule {
}
