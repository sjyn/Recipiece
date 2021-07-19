import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-config-recipe-basics',
  templateUrl: './config-recipe-basics.component.html',
  styleUrls: ['./config-recipe-basics.component.sass'],
})
export class ConfigRecipeBasicsComponent implements OnInit {
  @Input() recipe: IRecipe;
  readonly maxDescriptionLen = 1000;
  readonly maxNameLen = 250;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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

  public addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim().toLowerCase();
    if (value.length > 0 && !this.recipe.tags.includes(value)) {
      this.recipe.tags.push(value);
    }
    event.chipInput!.clear();
  }

  public removeTag(tag: string) {
    this.recipe.tags = this.recipe.tags.filter((t) => t !== tag);
  }

  // removeTag(fruit: Fruit): void {
  //   const index = this.fruits.indexOf(fruit);
  //
  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

}
