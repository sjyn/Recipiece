import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewRecipeBookComponent} from './view-recipe-book.component';


@NgModule({
  declarations: [
    ViewRecipeBookComponent,
  ],
  exports: [
    ViewRecipeBookComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ViewRecipeBookModule {
}
