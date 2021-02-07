import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IRecipe} from '../../../../api/model/recipe';

@Component({
  selector: 'app-delete-recipe-modal',
  templateUrl: './delete-recipe-modal.component.html',
  styleUrls: ['./delete-recipe-modal.component.sass'],
})
export class DeleteRecipeModalComponent implements OnInit {

  public get recipe(): IRecipe {
    return this.data.recipe;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { recipe: IRecipe },
    public dialogRef: MatDialogRef<DeleteRecipeModalComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  public deleteRecipe() {
    this.dialogRef.close(true);
  }

  public goBack() {
    this.dialogRef.close(false);
  }

}
