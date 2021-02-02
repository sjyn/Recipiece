import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';

@Component({
  selector: 'app-config-recipe-basics',
  templateUrl: './config-recipe-basics.component.html',
  styleUrls: ['./config-recipe-basics.component.sass'],
})
export class ConfigRecipeBasicsComponent implements OnInit {
  @Input() recipe: IRecipe;
  readonly maxDescriptionLen = 1000;
  readonly maxNameLen = 250;

  public get nameHint(): string {
    return `${(this.recipe.name || '').length} / ${this.maxNameLen}`;
  }

  public get descriptionHint(): string {
    return `${(this.recipe.description || '').length} / ${this.maxDescriptionLen}`;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
