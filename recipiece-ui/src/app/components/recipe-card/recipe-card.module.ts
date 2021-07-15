import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeCardComponent} from './recipe-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AddToShoppingListComponent} from './add-to-shopping-list/add-to-shopping-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    RecipeCardComponent,
    AddToShoppingListComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
  ],
  exports: [
    RecipeCardComponent,
  ],
  entryComponents: [
    AddToShoppingListComponent,
  ],
})
export class RecipeCardModule {
}
