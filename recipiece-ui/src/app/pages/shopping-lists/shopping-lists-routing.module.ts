import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListDashboardComponent} from './shopping-list-dashboard.component';
import {RequireAuthGuard} from '../../guards/require-auth-guard.service';
import {SingleListViewComponent} from './single-list-view/single-list-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lists',
  },
  {
    path: 'lists',
    component: ShoppingListDashboardComponent,
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'view/:listId',
    component: SingleListViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsRoutingModule {
}
