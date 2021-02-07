import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeCardGridComponent} from './recipe-card-grid.component';
import {RecipeCardModule} from '../recipe-card/recipe-card.module';


@NgModule({
  declarations: [
    RecipeCardGridComponent,
  ],
  imports: [
    CommonModule,
    RecipeCardModule,
  ],
  exports: [
    RecipeCardGridComponent,
  ],
})
export class RecipeCardGridModule {
}
