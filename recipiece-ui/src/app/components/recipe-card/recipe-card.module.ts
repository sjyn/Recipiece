import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeCardComponent} from './recipe-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    RecipeCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
  ],
  exports: [
    RecipeCardComponent,
  ],
})
export class RecipeCardModule {
}
