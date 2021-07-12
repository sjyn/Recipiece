import {NgModule} from '@angular/core';
import {RecipeService} from './recipe.service';
import {RecipeBookService} from './recipe-book.service';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ShoppingListService} from './shopping-list.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    RecipeService,
    RecipeBookService,
    UserService,
    ShoppingListService,
  ],
})
export class ApiModule {
}
