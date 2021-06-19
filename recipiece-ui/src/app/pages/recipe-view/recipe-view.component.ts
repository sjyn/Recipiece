import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IRecipe} from '../../api/model/recipe';
import {map, switchMap, take} from 'rxjs/operators';
import {RecipeService} from '../../api/recipe.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.sass'],
})
export class RecipeViewComponent implements OnInit {
  public loading: boolean;
  public recipe: IRecipe;

  public get loggedIn(): boolean {
    return !!this.storageService.loggedIn;
  }

  public get ownedByUser(): boolean {
    return this.loggedIn && this.recipe?.owner === this.storageService.session?._id;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap
      .pipe(
        take(1),
        map((params) => {
          return params.get('recipeId');
        }),
        switchMap((recipeId: string) => {
          return this.recipeService.getById(recipeId);
        }),
      )
      .subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
        this.loading = false;
      }, (err) => {
        console.error(err);
        this.loading = false;
      });
  }

  public goToEdit() {
    this.router.navigate(['config', this.recipe._id]);
  }

}
