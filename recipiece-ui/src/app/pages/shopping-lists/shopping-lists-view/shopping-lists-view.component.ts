import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../../api/shopping-list.service';
import {ReplaySubject, Subject} from 'rxjs';
import {IShoppingList} from '../../../api/model/shopping-list';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-lists-view',
  templateUrl: './shopping-lists-view.component.html',
  styleUrls: ['./shopping-lists-view.component.sass'],
})
export class ShoppingListsViewComponent implements OnInit {
  public currentPage: number;
  public $lists: Subject<IShoppingList[]>;

  constructor(
    private shoppingListApi: ShoppingListService,
    private router: Router,
  ) {
    this.$lists = new ReplaySubject();
    this.currentPage = 0;
  }

  ngOnInit(): void {
    this.shoppingListApi.list(this.currentPage)
      .pipe(take(1))
      .subscribe((results) => {
        this.$lists.next(results as IShoppingList[]);
      });
  }

  public goToList(listId: string) {
    this.router.navigate(['shopping-lists', 'view', listId]);
  }

  public createNewList() {
    const newList: Partial<IShoppingList> = {
      name: 'New List',
      listItems: [],
    };
    this.shoppingListApi.save(newList)
      .pipe(take(1))
      .subscribe((createdList) => {
        this.goToList(createdList._id);
      });
  }

}
