import {Component, OnInit} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';
import {RecipeService} from '../../api/recipe.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-recipe-config',
  templateUrl: './recipe-config.component.html',
  styleUrls: ['./recipe-config.component.sass'],
})
export class RecipeConfigComponent implements OnInit {
  public recipe: IRecipe;
  public editing: boolean;
  public loading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
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
            return this.recipeService.getById(+recipeId);
          } else {
            return of({});
          }
        }),
      )
      .subscribe((recipe) => {
        this.recipe = recipe as IRecipe;
        this.loading = false;
      });
  }

}
