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
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {LinkRecipeModalComponent} from './modals/link-recipe-modal/link-recipe-modal.component';
import {LinkRecipeService} from './services/link-recipe.service';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfigRecipeEquipmentComponent } from './config-recipe-equipment/config-recipe-equipment.component';


@NgModule({
  declarations: [
    RecipeConfigComponent,
    ConfigRecipeBasicsComponent,
    ConfigRecipeIngredientsComponent,
    ConfigRecipeStepsComponent,
    LinkRecipeModalComponent,
    ConfigRecipeEquipmentComponent,
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
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  providers: [
    ConfigManagerService,
    LinkRecipeService,
  ],
  entryComponents: [
    LinkRecipeModalComponent,
  ],
})
export class RecipeConfigModule {
}
