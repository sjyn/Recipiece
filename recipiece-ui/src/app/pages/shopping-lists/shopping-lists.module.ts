import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingListsRoutingModule} from './shopping-lists-routing.module';
import {ShoppingListDashboardComponent} from './shopping-list-dashboard.component';
import {ShoppingListsViewComponent} from './shopping-lists-view/shopping-lists-view.component';
import {ShoppingListsManagerService} from './services/shopping-lists-manager.service';
import {SingleListViewComponent} from './single-list-view/single-list-view.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {OrdinalViewComponent} from './single-list-view/ordinal-view/ordinal-view.component';
import {CategoryViewComponent} from './single-list-view/category-view/category-view.component';
import {MatRippleModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ShoppingListDashboardComponent,
    ShoppingListsViewComponent,
    SingleListViewComponent,
    OrdinalViewComponent,
    CategoryViewComponent,
  ],
  imports: [
    CommonModule,
    ShoppingListsRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatRippleModule,
    MatSortModule,
    MatMenuModule,
    DragDropModule
  ],
  providers: [
    ShoppingListsManagerService,
  ],
})
export class ShoppingListsModule {
}
