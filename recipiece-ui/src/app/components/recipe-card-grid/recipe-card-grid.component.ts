import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';
import {RecipeCardIconClasses} from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-card-grid',
  templateUrl: './recipe-card-grid.component.html',
  styleUrls: ['./recipe-card-grid.component.sass'],
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

  constructor() {
    this.viewed = new EventEmitter<IRecipe>();
    this.edited = new EventEmitter<IRecipe>();
    this.deleted = new EventEmitter<IRecipe>();
    this.copied = new EventEmitter<IRecipe>();
  }

  ngOnInit(): void {
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
    event.dataTransfer.setData("text", JSON.stringify(recipe));
  }

}
