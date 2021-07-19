import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IShoppingList} from '../../../../api/model/shopping-list';
import {ShoppingListService} from '../../../../api/shopping-list.service';

export interface ShareListModalData {
  shoppingList: IShoppingList
}

@Component({
  selector: 'app-share-list-modal',
  templateUrl: './share-list-modal.component.html',
  styleUrls: ['./share-list-modal.component.sass'],
})
export class ShareListModalComponent implements OnInit {
  public shoppingList: IShoppingList;

  constructor(
    public dialogRef: MatDialogRef<ShareListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShareListModalData,
    public shoppingListApi: ShoppingListService,
  ) {
  }

  ngOnInit(): void {
    this.shoppingList = this.data.shoppingList;
  }

}
