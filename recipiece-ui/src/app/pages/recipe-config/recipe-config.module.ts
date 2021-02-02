import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipeConfigRoutingModule} from './recipe-config-routing.module';
import {RecipeConfigComponent} from './recipe-config.component';
import {ConfigRecipeBasicsComponent} from './config-recipe-basics/config-recipe-basics.component';
import {ConfigRecipeIngredientsComponent} from './config-recipe-ingredients/config-recipe-ingredients.component';
import {ConfigRecipeStepsComponent} from './config-recipe-steps/config-recipe-steps.component';
import {ConfigManagerService} from './config-manager.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    RecipeConfigComponent,
    ConfigRecipeBasicsComponent,
    ConfigRecipeIngredientsComponent,
    ConfigRecipeStepsComponent,
  ],
  imports: [
    CommonModule,
    RecipeConfigRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    ConfigManagerService,
  ],
})
export class RecipeConfigModule {
}
