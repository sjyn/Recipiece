import {Component, OnInit} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';
import {RecipeService} from '../../api/recipe.service';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FromLinkModalComponent, FromLinkModalResult} from './modals/from-link-modal/from-link-modal.component';
import {nou} from '../../classes/utils';

@Component({
  selector: 'app-recipe-config',
  templateUrl: './recipe-config.component.html',
  styleUrls: ['./recipe-config.component.sass'],
})
export class RecipeConfigComponent implements OnInit {
  public recipe: IRecipe;
  public editing: boolean;
  public loading: boolean;

  public get headerText(): string {
    return this.editing ? 'Edit Recipe' : 'Create A Recipe';
  }

  public get errorText(): string {
    if (!!this.recipe) {
      if ((this.recipe.name || '').trim() === '') {
        return 'You need to name your recipe.';
      } else if ((this.recipe.description || '').trim() === '') {
        return 'You need to give your recipe a description.';
      }

      // we really only need to check steps/ings on recipes with no links
      if ((this.recipe.links || []).length === 0) {
        if ((this.recipe.ingredients || []).length === 0) {
          return 'Your recipe should have at least one ingredient, or a linked recipe.';
        } else if ((this.recipe.steps || []).length === 0) {
          return 'Your recipe should have at least one step, or a linked recipe.';
        }

        const invalidIngs = this.recipe.ingredients.map((ing, index) => {
          return {ing, index};
        }).filter((mappedIng) => {
          return (mappedIng.ing.amount || '').trim() === '' || (mappedIng.ing.name || '').trim() === '';
        });
        if (invalidIngs.length > 0) {
          return `Ingredient ${invalidIngs[0].index + 1} needs to have a name and an amount.`;
        }

        const invalidSteps = this.recipe.steps.map((step, index: number) => {
          return {content: step.content || '', index: index};
        }).filter((step) => {
          return step.content.trim() === '';
        });
        if (invalidSteps.length > 0) {
          return `Step ${invalidSteps[0].index + 1} needs some content.`;
        }
      }
    }
    return undefined;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private dialogService: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap
      .pipe(
        take(1),
        switchMap((params) => {
          const recipeId = params.get('recipeId');
          if (!!recipeId) {
            this.editing = true;
            return this.recipeService.getById(recipeId);
          } else {
            return of(this.genNewRecipe());
          }
        }),
      )
      .subscribe((recipe) => {
        this.recipe = recipe as IRecipe;
        this.loading = false;
      });
  }

  public saveRecipe() {
    this.recipeService.save(this.recipe)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['dashboard']);
      });
  }

  public openFromLinkModal() {
    const dialogRef = this.dialogService.open(FromLinkModalComponent, {
      width: '500px',
    });
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((result: FromLinkModalResult) => {
        if (!nou(result.recipe)) {
          this.recipe = result.recipe;
        }
      });
  }

  private genNewRecipe(): IRecipe {
    return {
      name: '',
      description: '',
      private: true,
      steps: [],
      ingredients: [],
      advanced: {
        highAltitude: false,
      },
      tags: [],
    };
  }

}
