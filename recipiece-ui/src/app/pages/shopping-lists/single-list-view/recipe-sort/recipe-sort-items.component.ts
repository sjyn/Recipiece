import {Component, OnInit} from '@angular/core';
import {IShoppingListItem} from '../../../../api/model/shopping-list';
import {RecipeService} from '../../../../api/recipe.service';
import {ReplaySubject, Subscription, zip} from 'rxjs';
import {ListHelperService} from '../list-helper.service';
import {map, take, tap} from 'rxjs/operators';
import {IRecipe} from '../../../../api/model/recipe';
import {nou} from '../../../../classes/utils';
import {MatTableDataSource} from '@angular/material/table';
import {ColumnKeys} from '../tables/items-table/items-table.component';

type SortedRecipes = { [recipeId: string]: MatTableDataSource<IShoppingListItem> }

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-sort-items.component.html',
  styleUrls: ['./recipe-sort-items.component.sass'],
})
export class RecipeSortItemsComponent implements OnInit {
  public $sortedRecipeMap: ReplaySubject<SortedRecipes>;
  public recipesChanged$: Subscription;
  public recipes: IRecipe[];
  public readonly UNCAT_KEY = 'uncat';

  public readonly columns = [
    ColumnKeys.complete,
    ColumnKeys.itemName,
    ColumnKeys.notes,
    ColumnKeys.edit,
    ColumnKeys.remove,
  ];

  constructor(
    private recipeApi: RecipeService,
    private listHelper: ListHelperService,
  ) {
    this.$sortedRecipeMap = new ReplaySubject();
  }


  ngOnInit(): void {
    this.mungeRecipes();
    this.recipesChanged$ = this.listHelper.$shoppingList
      .subscribe(() => {
        this.mungeRecipes();
      });
  }

  public getKeys(sorted: SortedRecipes) {
    return Object.keys(sorted);
  }

  public getRecipeForKey(recipeId: string): IRecipe {
    return this.recipes.find((recipe) => recipe._id === recipeId);
  }

  public dataSourceChanged(dataSource: MatTableDataSource<IShoppingListItem>) {
    this.listHelper.setItems(dataSource.data);
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
    if(recipeObservables.length > 0) {
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
    } else {
      this.$sortedRecipeMap.next(this.createSortedRecipes([]))
    }
  }

  private createSortedRecipes(recipes: IRecipe[]): SortedRecipes {
    const sortedMap = {};
    recipes.forEach((recipe) => {
      sortedMap[recipe._id] = new MatTableDataSource(this.listHelper.shoppingList.listItems
        .filter((listItem) => listItem.recipe === recipe._id));
    });

    const itemsWithNoRecipe = this.listHelper.shoppingList.listItems
      .filter((item) => nou(item.recipe));
    if (itemsWithNoRecipe.length > 0) {
      sortedMap[this.UNCAT_KEY] = new MatTableDataSource(itemsWithNoRecipe);
    }
    return sortedMap;
  }

}
