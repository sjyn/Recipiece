import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeViewComponent} from './recipe-view.component';


const routes: Routes = [
  {
    path: ':recipeId',
    component: RecipeViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeViewRoutingModule {
}
