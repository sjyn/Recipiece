import {Component, OnInit} from '@angular/core';
import {IShoppingListItem} from '../../../../api/model/shopping-list';
import {RecipeService} from '../../../../api/recipe.service';
import {ReplaySubject, zip} from 'rxjs';
import {ListHelperService} from '../list-helper.service';
import {map, take, tap} from 'rxjs/operators';
import {IRecipe} from '../../../../api/model/recipe';
import {nou} from '../../../../classes/utils';

type SortedRecipes = { [recipeId: string]: IShoppingListItem[] }

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-sort-items.component.html',
  styleUrls: ['./recipe-sort-items.component.sass'],
})
export class RecipeSortItemsComponent implements OnInit {
  public $sortedRecipeMap: ReplaySubject<SortedRecipes>;
  public recipes: IRecipe[];
  public readonly UNCAT_KEY = 'uncat';

  constructor(
    private recipeApi: RecipeService,
    private listHelper: ListHelperService,
  ) {
    this.$sortedRecipeMap = new ReplaySubject();
  }


  ngOnInit(): void {
    this.mungeRecipes();
  }

  addItem() {
  }

  removeAll() {
  }

  removeAllDone() {

  }

  public getKeys(sorted: SortedRecipes) {
    return Object.keys(sorted);
  }

  public getRecipeForKey(recipeId: string): IRecipe {
    return this.recipes.find((recipe) => recipe._id === recipeId);
  }

  private mungeRecipes() {
    // get all the recipes that are required in this list
    const recipeObservables = this.listHelper.shoppingList.listItems
      .map((item) => {
        if (!!item.recipe) {
          return this.recipeApi.getById(item.recipe);
        } else {
          return undefined;
        }
      })
      .filter((obs) => !!obs);

    // sort the items by recipeId
    zip(...recipeObservables)
      .pipe(
        take(1),
        tap((recipes: IRecipe[]) => {
          this.recipes = recipes;
        }),
        map((recipes: IRecipe[]) => {
          return this.createSortedRecipes(recipes);
        }),
      )
      .subscribe((sortedRecipes: SortedRecipes) => {
        this.$sortedRecipeMap.next(sortedRecipes);
      });
  }

  private createSortedRecipes(recipes: IRecipe[]): SortedRecipes {
    const sortedMap = {};
    recipes.forEach((recipe) => {
      sortedMap[recipe._id] = this.listHelper.shoppingList.listItems
        .filter((listItem) => listItem.recipe === recipe._id);
    });

    const itemsWithNoRecipe = this.listHelper.shoppingList.listItems
      .filter((item) => nou(item.recipe));
    if (itemsWithNoRecipe.length > 0) {
      sortedMap[this.UNCAT_KEY] = itemsWithNoRecipe;
    }
    return sortedMap;
  }

}
