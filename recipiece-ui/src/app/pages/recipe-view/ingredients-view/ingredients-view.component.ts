import {Component, Input, OnInit} from '@angular/core';
import {IRecipe, IRecipeIngredient} from '../../../api/model/recipe';

@Component({
  selector: 'app-ingredients-view',
  templateUrl: './ingredients-view.component.html',
  styleUrls: ['./ingredients-view.component.sass'],
})
export class IngredientsViewComponent implements OnInit {
  @Input() recipe: IRecipe;

  constructor() {
  }

  ngOnInit(): void {
  }

  public getIngDisplay(ingredient: IRecipeIngredient): string {
    if (!!ingredient.unit) {
      return `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
    } else {
      return `${ingredient.amount} ${ingredient.name}`;
    }
  }

}
