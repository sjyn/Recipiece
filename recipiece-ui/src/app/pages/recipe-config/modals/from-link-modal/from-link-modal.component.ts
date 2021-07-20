import {Component, OnInit} from '@angular/core';
import {IRecipe} from '../../../../api/model/recipe';
import {MatDialogRef} from '@angular/material/dialog';
import {RecipeService} from '../../../../api/recipe.service';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {nou} from '../../../../classes/utils';

export interface FromLinkModalResult {
  recipe?: IRecipe;
}

@Component({
  selector: 'app-from-link-modal',
  templateUrl: './from-link-modal.component.html',
  styleUrls: ['./from-link-modal.component.sass'],
})
export class FromLinkModalComponent implements OnInit {
  public url: string;
  public showCouldNotLoad: boolean;

  public get disableFetchButton(): boolean {
    return (this.url || '').trim().length === 0;
  }

  constructor(
    public dialogRef: MatDialogRef<FromLinkModalComponent>,
    private recipeApi: RecipeService,
  ) {
  }

  ngOnInit(): void {
  }

  public parseUrl() {
    this.recipeApi.parseFromUrl(this.url.trim())
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 422) {
            return of(null);
          }
        }),
      )
      .subscribe((result: IRecipe) => {
        if (!nou(result)) {
          this.close(result);
        } else {
          this.showCouldNotLoad = true;
        }
      });
  }

  public close(recipe: IRecipe) {
    this.dialogRef.close(<FromLinkModalResult> {
      recipe: recipe,
    });
  }

  public cancel() {
    this.dialogRef.close(<FromLinkModalResult> {
      recipe: null,
    });
  }

}
