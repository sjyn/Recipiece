import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IShoppingListItem} from '../../../../../api/model/shopping-list';
import {MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSort} from '@angular/material/sort';

export class ColumnKeys {
  public static readonly reorder = 'reorder';
  public static readonly complete = 'complete';
  public static readonly itemName = 'name';
  public static readonly notes = 'notes';
  public static readonly edit = 'toggle-edit';
  public static readonly remove = 'remove';
}

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.sass'],
})
export class ItemsTableComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) set sort(setter: MatSort) {
    if (!!setter) {
      this.dataSource.sort = setter;
    }
  }

  @Input() columns: string[];
  @Input() reorderable: boolean;
  @Input() dataSource: MatTableDataSource<IShoppingListItem>;
  @Output() dataSourceChange: EventEmitter<MatTableDataSource<IShoppingListItem>>

  public readonly columnKeys = ColumnKeys;
  public editingItem: string;

  public get numDone(): number {
    return this.dataSource.data.filter((item) => item.completed).length;
  }

  public get anyDone(): boolean {
    return this.numDone > 0;
  }

  public get allDone(): boolean {
    return this.numDone === this.dataSource.data.length;
  }

  constructor() {
    this.dataSourceChange = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public hasColumn(colKey: string): boolean {
    return this.columns.indexOf(colKey) !== -1;
  }

  public startItemEdit(itemId: string) {
    this.editingItem = itemId;
  }

  public exitItemEdit() {
    this.editingItem = undefined;
    this.dataSourceChange.emit(this.dataSource);
  }

  public isEditingItem(itemId: string): boolean {
    return this.editingItem !== null && this.editingItem !== undefined && this.editingItem === itemId;
  }

  public removeItem(index: number) {
    this.dataSource.data = this.dataSource.data.filter((_, idx) => idx !== index);
    this.dataSourceChange.emit(this.dataSource);
  }

  public determineCheckAction(allChecked: boolean) {
    this.dataSource.data.forEach((item) => item.completed = allChecked);
    this.dataSourceChange.emit(this.dataSource);
  }

  public dropItemInTable(event: CdkDragDrop<IShoppingListItem[]>) {
    const prevIndex = this.dataSource.data.findIndex((d) => d === event.item.data);
    const dataToMove = [...this.dataSource.data];
    moveItemInArray(dataToMove, prevIndex, event.currentIndex);
    dataToMove.forEach((item, idx) => {
      item.ordinal = idx;
    });
    this.dataSource.data = dataToMove;
    this.dataSourceChange.emit(this.dataSource);
    // this.listHelper.setItems(this.list);
  }

}
