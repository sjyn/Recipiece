import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IRecipeBook} from '../../../../api/model/recipe-book';

@Component({
  selector: 'app-delete-recipe-book-modal',
  templateUrl: './delete-recipe-book-modal.component.html',
  styleUrls: ['./delete-recipe-book-modal.component.sass'],
})
export class DeleteRecipeBookModalComponent implements OnInit {

  public get recipeBook(): IRecipeBook {
    return this.data.book;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { book: IRecipeBook },
    public dialogRef: MatDialogRef<DeleteRecipeBookModalComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close(false);
  }

  public deleteBook() {
    this.dialogRef.close(true);
  }

}
