import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';
import {Clipboard} from '@angular/cdk/clipboard';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs';
import {IShoppingList} from '../../api/model/shopping-list';
import {switchMap, take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddToShoppingListCloseBundle, AddToShoppingListComponent} from './add-to-shopping-list/add-to-shopping-list.component';
import {RecipeCardManagerService} from './recipe-card-manager.service';


export interface RecipeCardIconClasses {
  delete: string;
  edit: string;
  view: string;
  link: string;
}


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: IRecipe;
  @Input() allowEdit: boolean;
  @Input() allowDelete: boolean;
  @Input() icons: Partial<RecipeCardIconClasses> = {};
  @Output() edited: EventEmitter<IRecipe>;
  @Output() deleted: EventEmitter<IRecipe>;
  @Output() viewed: EventEmitter<IRecipe>;
  @Output() linked: EventEmitter<IRecipe>;

  public iconClasses: RecipeCardIconClasses;

  private readonly defaultIconClasses: RecipeCardIconClasses = {
    delete: 'delete',
    edit: 'edit',
    view: 'visibility',
    link: 'link',
  };

  constructor(
    public recipeCardManager: RecipeCardManagerService,
    private clipboard: Clipboard,
    private dialog: MatDialog,
  ) {
    this.edited = new EventEmitter<IRecipe>();
    this.deleted = new EventEmitter<IRecipe>();
    this.viewed = new EventEmitter<IRecipe>();
    this.linked = new EventEmitter<IRecipe>();
  }

  ngOnInit(): void {
    this.iconClasses = {
      ...this.defaultIconClasses,
      ...this.icons,
    };
  }

  public editPressed() {
    if (this.allowEdit) {
      this.edited.emit(this.recipe);
    }
  }

  public deletePressed() {
    if (this.allowDelete) {
      this.deleted.emit(this.recipe);
    }
  }

  public viewPressed() {
    this.viewed.emit(this.recipe);
  }

  public linkPressed() {
    const copyText = `${environment.serve.protocol}://${environment.host}:${environment.serve.port}/recipes/${this.recipe._id}`;
    this.clipboard.copy(copyText);
    this.linked.emit(this.recipe);
  }

  public addToShoppingList(list: IShoppingList) {
    const dialogRef = this.dialog.open(AddToShoppingListComponent, {
      width: '400px',
      data: {
        list: list,
        recipe: this.recipe,
      },
    });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        switchMap((result: AddToShoppingListCloseBundle) => {
          if (result.saved) {
            return this.recipeCardManager.saveList(result.list);
          } else {
            return of({});
          }
        }),
      )
      .subscribe();
  }

}
