import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IShoppingListItem} from '../../../../api/model/shopping-list';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ItemsView} from '../items-view';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-ordinal-view',
  templateUrl: './ordinal-view.component.html',
  styleUrls: ['./ordinal-view.component.sass'],
})
export class OrdinalViewComponent implements OnInit, ItemsView {
  @ViewChild(MatSort, {static: false}) set sort(setter: MatSort) {
    if (!!setter) {
      this.dataSource.sort = setter;
    }
  }

  @Input() list: IShoppingListItem[];
  public dataSource: MatTableDataSource<IShoppingListItem>;

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

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.list);
  }

  public addItem() {
    this.list.unshift({
      id: uuidv4(),
      name: '',
      notes: '',
      category: '',
      ordinal: this.dataSource.data.length,
      completed: false,
    });
    this.dataSource.data = this.list;
    this.startItemEdit(this.list[0].id);
  }

  public removeItem(index: number) {
    this.list = this.list.filter((_, idx) => idx !== index);
    this.dataSource.data = this.list;
  }

  public startItemEdit(itemId: string) {
    this.editingItem = itemId;
  }

  public exitItemEdit() {
    this.editingItem = undefined;
  }

  public isEditingItem(itemId: string): boolean {
    return this.editingItem !== null && this.editingItem !== undefined && this.editingItem === itemId;
  }

  public removeAll() {
    this.list = [];
    this.dataSource.data = this.list;
  }

  public removeAllDone() {
    this.list = this.list.filter((item) => !item.completed);
    this.dataSource.data = this.list;
  }

  public determineCheckAction(allChecked: boolean) {
    this.list.forEach((item) => item.completed = allChecked);
    this.dataSource.data = this.list;
  }

  public dropItemInTable(event: CdkDragDrop<IShoppingListItem[]>) {
    const prevIndex = this.list.findIndex((d) => d === event.item.data);
    moveItemInArray(this.list, prevIndex, event.currentIndex);
    this.list.forEach((item, idx) => {
      item.ordinal = idx;
    });
    this.dataSource.data = this.list;
  }
}
