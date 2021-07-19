import {Component, OnDestroy, OnInit} from '@angular/core';
import {IShoppingListItem} from '../../../../api/model/shopping-list';
import {MatTableDataSource} from '@angular/material/table';
import {ListHelperService} from '../list-helper.service';
import {ColumnKeys} from '../tables/items-table/items-table.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ordinal-view',
  templateUrl: './ordinal-items.component.html',
  styleUrls: ['./ordinal-items.component.sass'],
})
export class OrdinalItemsComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<IShoppingListItem>;
  private shoppingList$: Subscription;

  public readonly columns = [
    ColumnKeys.reorder,
    ColumnKeys.complete,
    ColumnKeys.itemName,
    ColumnKeys.notes,
    ColumnKeys.edit,
    ColumnKeys.remove,
  ];

  constructor(
    private listHelper: ListHelperService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listHelper.shoppingList.listItems);
    this.shoppingList$ = this.listHelper.$shoppingList
      .subscribe((updatedList) => {
        this.dataSource.data = updatedList.listItems;
      });
  }

  ngOnDestroy() {
    if (!!this.shoppingList$) {
      this.shoppingList$.unsubscribe();
    }
  }

  public dataSourceUpdated(dataSource: MatTableDataSource<IShoppingListItem>) {
    this.listHelper.setItems(dataSource.data);
  }
}
