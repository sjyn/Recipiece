import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListDashboardComponent} from './shopping-list-dashboard.component';
import {RequireAuthGuard} from '../../guards/require-auth-guard.service';
import {SingleListViewComponent} from './single-list-view/single-list-view.component';
import {OrdinalItemsComponent} from './single-list-view/ordinal-sort/ordinal-items.component';
import {CategoryItemsComponent} from './single-list-view/category-sort/category-items.component';
import {RecipeSortItemsComponent} from './single-list-view/recipe-sort/recipe-sort-items.component';

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
    children: [
      {
        path: 'all',
        component: OrdinalItemsComponent,
      },
      {
        path: 'recipes',
        component: RecipeSortItemsComponent,
      },
      {
        path: 'categories',
        component: CategoryItemsComponent,
      },
      {
        path: '',
        redirectTo: 'all',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsRoutingModule {
}
