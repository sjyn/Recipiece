import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IShoppingListItem} from '../../../../api/model/shopping-list';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ListHelperService} from '../list-helper.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ordinal-view',
  templateUrl: './ordinal-items.component.html',
  styleUrls: ['./ordinal-items.component.sass'],
})
export class OrdinalItemsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: false}) set sort(setter: MatSort) {
    if (!!setter) {
      this.dataSource.sort = setter;
    }
  }

  public list: IShoppingListItem[];
  public dataSource: MatTableDataSource<IShoppingListItem>;
  private shoppingList$: Subscription;

  public get numDone(): number {
    return this.dataSource.data.filter((item) => item.completed).length;
  }

  public get anyDone(): boolean {
    return this.numDone > 0;
  }

  public get allDone(): boolean {
    return this.numDone === this.dataSource.data.length;
  }

  public editingItem: string;

  public readonly COL_REORDER = 'reorder';
  public readonly COL_COMPLETE = 'complete';
  public readonly COL_NAME = 'name';
  public readonly COL_NOTES = 'notes';
  public readonly COL_TOGGLE_EDIT = 'toggle-edit';
  public readonly COL_REMOVE = 'remove';

  public readonly columns = [
    this.COL_REORDER,
    this.COL_COMPLETE,
    this.COL_NAME,
    this.COL_NOTES,
    this.COL_TOGGLE_EDIT,
    this.COL_REMOVE,
  ];

  constructor(
    private listHelper: ListHelperService,
  ) {
  }

  ngOnInit(): void {
    this.list = this.listHelper.shoppingList.listItems;
    this.dataSource = new MatTableDataSource(this.list);

    this.shoppingList$ = this.listHelper.$shoppingList
      .subscribe((updatedList) => {
        const needsEnterEdit = updatedList.listItems.length > this.list.length;
        this.list = updatedList.listItems;
        this.dataSource.data = this.list;
        if(needsEnterEdit) {
          this.startItemEdit(this.list[0].id);
        }
      });
  }

  ngOnDestroy() {
    if (!!this.shoppingList$) {
      this.shoppingList$.unsubscribe();
    }
  }

  public removeItem(index: number) {
    this.listHelper.setItems(this.list.filter((_, idx) => idx !== index));
  }

  public startItemEdit(itemId: string) {
    this.editingItem = itemId;
  }

  public exitItemEdit() {
    this.editingItem = undefined;
    this.listHelper.maybeSave();
  }

  public isEditingItem(itemId: string): boolean {
    return this.editingItem !== null && this.editingItem !== undefined && this.editingItem === itemId;
  }

  public determineCheckAction(allChecked: boolean) {
    this.list.forEach((item) => item.completed = allChecked);
    this.listHelper.setItems(this.list);
  }

  public dropItemInTable(event: CdkDragDrop<IShoppingListItem[]>) {
    const prevIndex = this.list.findIndex((d) => d === event.item.data);
    moveItemInArray(this.list, prevIndex, event.currentIndex);
    this.list.forEach((item, idx) => {
      item.ordinal = idx;
    });
    this.listHelper.setItems(this.list);
  }
}
