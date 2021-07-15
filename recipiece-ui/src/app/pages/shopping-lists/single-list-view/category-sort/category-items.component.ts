import {Component, OnInit} from '@angular/core';
import {IShoppingList} from '../../../../api/model/shopping-list';
import {ItemsView} from '../items-view';
import {ListHelperService} from '../list-helper.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.sass'],
})
export class CategoryItemsComponent implements OnInit, ItemsView {
  public shoppingList: IShoppingList;

  constructor(
    private listHelper: ListHelperService,
  ) {
  }

  ngOnInit(): void {
  }

  addItem() {
  }

  removeAll() {
  }

  removeAllDone() {
  }

}
