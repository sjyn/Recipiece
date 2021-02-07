import {Component, OnInit} from '@angular/core';
import {IRecipeBook} from '../../../../api/model/recipe-book';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-recipe-book-modal',
  templateUrl: './create-recipe-book-modal.component.html',
  styleUrls: ['./create-recipe-book-modal.component.sass'],
})
export class CreateRecipeBookModalComponent implements OnInit {
  public recipeBook: Partial<IRecipeBook>;

  readonly descriptionLength = 200;

  public get disable(): boolean {
    return this.recipeBook.name.trim() === '' ||
      this.recipeBook.description.trim() === '';
  }

  constructor(
    private modalRef: MatDialogRef<CreateRecipeBookModalComponent>,
  ) {
  }

  ngOnInit(): void {
    this.recipeBook = {
      name: '',
      recipes: [],
      description: '',
    };
  }

  public save() {
    this.modalRef.close(this.recipeBook);
  }

  public close() {
    this.modalRef.close(undefined);
  }

}
