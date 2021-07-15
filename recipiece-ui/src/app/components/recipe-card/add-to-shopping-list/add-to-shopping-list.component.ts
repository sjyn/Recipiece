import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IShoppingList, IShoppingListItem} from '../../../api/model/shopping-list';
import {IRecipe, IRecipeIngredient} from '../../../api/model/recipe';
import {v4 as uuidv4} from 'uuid';

export interface AddToShoppingListDataBundle {
  list: IShoppingList,
  recipe: IRecipe,
}

export interface AddToShoppingListCloseBundle {
  list: IShoppingList;
  saved: boolean;
}

interface SelectableIngredients {
  ingredient: IRecipeIngredient;
  selected: boolean;
}

@Component({
  selector: 'app-add-to-shopping-list',
  templateUrl: './add-to-shopping-list.component.html',
  styleUrls: ['./add-to-shopping-list.component.sass'],
})
export class AddToShoppingListComponent implements OnInit {
  public shoppingList: IShoppingList;
  public recipe: IRecipe;
  public scale: number;
  public ingredients: SelectableIngredients[];

  constructor(
    private dialogRef: MatDialogRef<AddToShoppingListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddToShoppingListDataBundle,
  ) {
  }

  ngOnInit(): void {
    this.shoppingList = this.data.list;
    this.recipe = this.data.recipe;
    this.scale = 1;

    this.ingredients = this.recipe.ingredients.map((ing) => {
      return {
        ingredient: ing,
        selected: true,
      };
    });
  }

  public close() {
    this.mungeList();
    this.dialogRef.close(<AddToShoppingListCloseBundle> {
      list: this.shoppingList,
      saved: true,
    });
  }

  public cancel() {
    this.dialogRef.close(<AddToShoppingListCloseBundle> {
      list: this.shoppingList,
      saved: false,
    });
  }

  private mungeList() {
    this.ingredients
      .filter((ing) => ing.selected)
      .forEach((ing) => {
        let notesString = (+ing.ingredient.amount * this.scale).toString();
        if (!!ing.ingredient.unit) {
          notesString += ing.ingredient.unit;
        }

        const listItem: IShoppingListItem = {
          id: uuidv4(),
          name: ing.ingredient.name,
          recipe: this.recipe._id,
          notes: notesString,
          category: '',
          ordinal: this.shoppingList.listItems.length,
          completed: false,
        };
        this.shoppingList.listItems.push(listItem);
      });
  }

}
