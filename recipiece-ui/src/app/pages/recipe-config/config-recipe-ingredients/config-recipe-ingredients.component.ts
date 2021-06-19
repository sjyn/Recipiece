import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';
import {MatDialog} from '@angular/material/dialog';
import {LinkRecipeService} from '../services/link-recipe.service';

@Component({
  selector: 'app-config-recipe-ingredients',
  templateUrl: './config-recipe-ingredients.component.html',
  styleUrls: ['./config-recipe-ingredients.component.sass'],
})
export class ConfigRecipeIngredientsComponent implements OnInit {
  @Input() recipe: IRecipe;

  constructor(
    private linkService: LinkRecipeService,
  ) {
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

  public linkRecipe() {
    this.linkService.showDialog(this.recipe);
  }

}
