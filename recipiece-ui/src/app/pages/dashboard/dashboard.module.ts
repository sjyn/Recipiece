import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ViewRecipeBookModule} from '../../components/view-recipe-book/view-recipe-book.module';
import {DashboardDrawerComponent} from './dashboard-drawer/dashboard-drawer.component';
import {DashboardStateService} from './dashboard-state.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RecipeCardModule} from '../../components/recipe-card/recipe-card.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteRecipeModalComponent} from './modals/delete-recipe-modal/delete-recipe-modal.component';
import {CreateRecipeBookModalComponent} from './modals/create-recipe-book-modal/create-recipe-book-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {DeleteRecipeBookModalComponent} from './modals/delete-recipe-book-modal/delete-recipe-book-modal.component';
import {RecipeCardGridModule} from '../../components/recipe-card-grid/recipe-card-grid.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardDrawerComponent,
    DeleteRecipeModalComponent,
    CreateRecipeBookModalComponent,
    DeleteRecipeBookModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RecipeCardModule,
    ViewRecipeBookModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    RecipeCardGridModule,
  ],
  providers: [
    DashboardStateService,
  ],
  entryComponents: [
    DeleteRecipeModalComponent,
    CreateRecipeBookModalComponent,
    DeleteRecipeBookModalComponent,
  ],
})
export class DashboardModule {
}
