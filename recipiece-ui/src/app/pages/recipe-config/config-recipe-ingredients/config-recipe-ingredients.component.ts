import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';

@Component({
  selector: 'app-config-recipe-ingredients',
  templateUrl: './config-recipe-ingredients.component.html',
  styleUrls: ['./config-recipe-ingredients.component.sass'],
})
export class ConfigRecipeIngredientsComponent implements OnInit {
  @Input() recipe: IRecipe;

  constructor() {
  }

  ngOnInit(): void {
    if (this.recipe.ingredients === null || this.recipe.ingredients === undefined) {
      this.recipe.ingredients = [];
    }
  }

  public addIngredient() {
    this.recipe.ingredients.push({
      name: '',
      amount: '',
      unit: '',
    });
  }

  public removeIngredient(idx: number) {
    this.recipe.ingredients = this.recipe.ingredients.filter((_, index: number) => idx !== index);
  }

}
