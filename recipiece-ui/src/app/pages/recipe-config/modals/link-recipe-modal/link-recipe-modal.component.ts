import {Component, Inject, OnInit} from '@angular/core';
import {IRecipe} from '../../../../api/model/recipe';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-link-recipe-modal',
  templateUrl: './link-recipe-modal.component.html',
  styleUrls: ['./link-recipe-modal.component.sass'],
})
export class LinkRecipeModalComponent implements OnInit {
  public searchTerm: string;

  public get searchResults(): Observable<IRecipe[]> {
    // return this.recipeSearcher.searchResults;
    return of([]);
  }

  constructor(
    public dialogRef: MatDialogRef<LinkRecipeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecipe,
    // private recipeSearcher: RecipeSearchService,
  ) {
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close(undefined);
  }

  public linkAndClose(recipeToLink: IRecipe) {
    this.dialogRef.close(recipeToLink._id);
  }

  public runSearch() {
    // this.recipeSearcher.search(this.searchTerm);
  }

}
