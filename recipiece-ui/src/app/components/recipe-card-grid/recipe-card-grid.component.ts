import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';
import {RecipeCardIconClasses} from '../recipe-card/recipe-card.component';
import {RecipeCardManagerService} from '../recipe-card/recipe-card-manager.service';
import {ShoppingListService} from '../../api/shopping-list.service';
import {take} from 'rxjs/operators';
import {IShoppingList} from '../../api/model/shopping-list';

@Component({
  selector: 'app-recipe-card-grid',
  templateUrl: './recipe-card-grid.component.html',
  styleUrls: ['./recipe-card-grid.component.sass'],
  providers: [
    RecipeCardManagerService,
  ],
})
export class RecipeCardGridComponent implements OnInit {
  @Input() recipes: IRecipe[];
  @Input() manageable: boolean;
  @Input() draggable: boolean = false;
  @Input() iconClasses: Partial<RecipeCardIconClasses> = {};
  @Output() viewed: EventEmitter<IRecipe>;
  @Output() edited: EventEmitter<IRecipe>;
  @Output() deleted: EventEmitter<IRecipe>;
  @Output() copied: EventEmitter<IRecipe>;

  constructor(
    private shoppingListApi: ShoppingListService,
    private recipeCardManager: RecipeCardManagerService,
  ) {
    this.viewed = new EventEmitter<IRecipe>();
    this.edited = new EventEmitter<IRecipe>();
    this.deleted = new EventEmitter<IRecipe>();
    this.copied = new EventEmitter<IRecipe>();
  }

  ngOnInit(): void {
    this.shoppingListApi.list(0)
      .pipe(take(1))
      .subscribe((results) => {
        this.recipeCardManager.$shoppingLists.next(results as IShoppingList[]);
      });
  }

  public recipeEdited(recipe: IRecipe) {
    this.edited.emit(recipe);
  }

  public recipeViewed(recipe: IRecipe) {
    this.viewed.emit(recipe);
  }

  public recipeDeleted(recipe: IRecipe) {
    this.deleted.emit(recipe);
  }

  public recipeCopied(recipe: IRecipe) {
    this.copied.emit(recipe);
  }

  public dragStart(event, recipe: IRecipe) {
    event.dataTransfer.setData('text', JSON.stringify(recipe));
  }

}
