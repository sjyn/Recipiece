import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';
import {Clipboard} from '@angular/cdk/clipboard';
import {environment} from '../../../environments/environment';


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
    private clipboard: Clipboard,
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
    // const copyText = `${environment.serve.protocol}://${environment.host}:${environment.serve.port}/recipes/${this.recipe._id}`;
    // this.clipboard.copy(copyText);
    this.linked.emit(this.recipe);
  }

}
