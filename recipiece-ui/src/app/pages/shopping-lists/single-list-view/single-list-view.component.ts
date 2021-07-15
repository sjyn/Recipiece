import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../../api/shopping-list.service';
import {switchMap, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ListHelperService} from './list-helper.service';

@Component({
  selector: 'app-single-list-view',
  templateUrl: './single-list-view.component.html',
  styleUrls: ['./single-list-view.component.sass'],
  providers: [
    ListHelperService,
  ]
})
export class SingleListViewComponent implements OnInit {
  constructor(
    public listHelper: ListHelperService,
    private shoppingListApi: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const listId = params.get('listId');
          return this.shoppingListApi.getById(listId);
        }),
      )
      .subscribe((fetchedList) => {
        this.listHelper.shoppingList = fetchedList;
        this.router.navigate(['all'], {relativeTo: this.activatedRoute});
      });
  }

  public save() {
    this.listHelper.maybeSave();
  }

  public deleteList() {
    this.listHelper.deleteList()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['shopping-lists', 'lists']);
      })
  }

  public addItem() {
    this.listHelper.addItem();
  }

  public clearAllItems() {
    this.listHelper.removeAll();
  }

  public clearAllDoneItems() {
    this.listHelper.removeAllDone();
  }

}
