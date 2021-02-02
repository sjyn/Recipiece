import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IRecipe} from '../../../api/model/recipe';
import {RecipeService} from '../../../api/recipe.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-view-all-recipes',
  templateUrl: './view-all-recipes.component.html',
  styleUrls: ['./view-all-recipes.component.sass'],
})
export class ViewAllRecipesComponent implements OnInit {
  public page: number;

  public get recipes(): Observable<Partial<IRecipe>[]> {
    return this.recipeService.listForUser(this.page);
  }

  constructor(
    private recipeService: RecipeService,
  ) {
    this.page = 0;
  }

  ngOnInit(): void {
  }

}
