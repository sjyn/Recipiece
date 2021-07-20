import {Component, Input, OnInit} from '@angular/core';
import {IRecipe, IRecipeIngredient} from '../../../api/model/recipe';
import Fraction from 'fraction.js';

@Component({
  selector: 'app-ingredients-view',
  templateUrl: './ingredients-view.component.html',
  styleUrls: ['./ingredients-view.component.sass'],
})
export class IngredientsViewComponent implements OnInit {
  @Input() recipe: IRecipe;
  public scale: number;

  constructor() {
  }

  ngOnInit(): void {
    this.scale = 1;
  }

  public getIngDisplay(ingredient: IRecipeIngredient): string {
    const amount = new Fraction(ingredient.amount).mul(this.scale).toFraction(true);
    if (!!ingredient.unit) {
      return `${amount} ${ingredient.unit} ${ingredient.name}`;
    } else {
      return `${amount} ${ingredient.name}`;
    }
  }

}
