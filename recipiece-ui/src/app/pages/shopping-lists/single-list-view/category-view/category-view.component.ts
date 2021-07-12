import {Component, Input, OnInit} from '@angular/core';
import {IShoppingListItem} from '../../../../api/model/shopping-list';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.sass'],
})
export class CategoryViewComponent implements OnInit {
  @Input() list: IShoppingListItem[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
