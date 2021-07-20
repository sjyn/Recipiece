import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipeViewRoutingModule} from './recipe-view-routing.module';
import {RecipeViewComponent} from './recipe-view.component';
import {StepsViewComponent} from './steps-view/steps-view.component';
import {IngredientsViewComponent} from './ingredients-view/ingredients-view.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RecipeViewComponent,
    StepsViewComponent,
    IngredientsViewComponent,
  ],
  imports: [
    CommonModule,
    RecipeViewRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class RecipeViewModule {
}
