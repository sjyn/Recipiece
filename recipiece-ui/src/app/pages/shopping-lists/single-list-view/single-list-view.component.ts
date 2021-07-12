import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IShoppingList} from '../../../api/model/shopping-list';
import {ShoppingListService} from '../../../api/shopping-list.service';
import {switchMap, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {OrdinalViewComponent} from './ordinal-view/ordinal-view.component';
import {CategoryViewComponent} from './category-view/category-view.component';
import {ItemsView} from './items-view';

export type ShoppingListSort = 'custom' | 'category';

@Component({
  selector: 'app-single-list-view',
  templateUrl: './single-list-view.component.html',
  styleUrls: ['./single-list-view.component.sass'],
})
export class SingleListViewComponent implements OnInit {
  @Input() shoppingList: Partial<IShoppingList>;
  @ViewChild(OrdinalViewComponent, {static: false}) ordinalView: ItemsView;
  @ViewChild(CategoryViewComponent, {static: false}) categoryView: ItemsView;

  public get currentView(): ItemsView {
    if (this.sortType === 'custom') {
      return this.ordinalView;
    } else if (this.sortType === 'category') {
      return this.categoryView;
    }
  }

  public sortType: ShoppingListSort;

  constructor(
    private shoppingListApi: ShoppingListService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.sortType = 'custom';
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const listId = params.get('listId');
          return this.shoppingListApi.getById(listId);
        }),
      )
      .subscribe((fetchedList) => {
        this.shoppingList = fetchedList;
      });
  }

  public save() {
    this.shoppingListApi.save(this.shoppingList)
      .pipe(take(1))
      .subscribe((savedList) => {
        this.shoppingList = savedList as IShoppingList;
      });
  }

  public addItem() {
    this.currentView.addItem();
  }

  public clearAllItems() {
    this.currentView.removeAll();
  }

  public clearAllDoneItems() {
    this.currentView.removeAllDone();
  }

}
