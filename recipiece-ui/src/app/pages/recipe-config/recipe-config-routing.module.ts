import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeConfigComponent} from './recipe-config.component';


const routes: Routes = [
  {
    path: ':recipeId',
    component: RecipeConfigComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: RecipeConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeConfigRoutingModule {
}
