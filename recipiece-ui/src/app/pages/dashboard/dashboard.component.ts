import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiGlobalsService} from '../../services/ui-globals.service';
import {DashboardStateService, RecipeSearchBundle} from './dashboard-state.service';
import {IRecipe} from '../../api/model/recipe';
import {DeleteRecipeModalComponent} from './modals/delete-recipe-modal/delete-recipe-modal.component';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RecipeCardIconClasses} from '../../components/recipe-card/recipe-card.component';
import {AdvancedSearchModalComponent, AdvanceSearchConfig} from './modals/advanced-search-modal/advanced-search-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  public get iconClasses(): Partial<RecipeCardIconClasses> {
    if (!!this.dashboardState.selectedBook) {
      return {delete: 'highlight_off'};
    }
    return {};
  }

  constructor(
    public uiGlobals: UiGlobalsService,
    public dashboardState: DashboardStateService,
    private router: Router,
    private modalService: MatDialog,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.uiGlobals.showDrawer = true;
    });
    this.dashboardState.selectedBook = undefined;
  }

  ngOnDestroy() {
    this.uiGlobals.showDrawer = false;
    this.dashboardState.clearSearch();
  }

  public recipeEdited(recipe: IRecipe) {
    this.router.navigate(['config', recipe._id]);
  }

  public recipeViewed(recipe: IRecipe) {
    this.router.navigate(['recipe', recipe._id]);
  }

  public recipeDeleted(recipe: IRecipe) {
    if (!!this.dashboardState.selectedBook) {
      this.removeRecipeFromBook(recipe);
    } else {
      this.deleteRecipe(recipe);
    }
  }

  private removeRecipeFromBook(recipe: IRecipe) {
    this.dashboardState.removeRecipeFromCurrentBook(recipe);
  }

  private deleteRecipe(recipe: IRecipe) {
    const dialogRef = this.modalService.open(DeleteRecipeModalComponent, {
      data: {recipe: recipe},
    });
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((closeReason) => {
        if (closeReason === true) {
          this.dashboardState.deleteRecipe(recipe);
        }
      });
  }

  public recipeCopied(recipe: IRecipe) {
    this.snackbar.open(`A link to the recipe was copied to your clipboard!`, 'OK', {
      duration: 2000,
    });
  }

  public openAdvancedSearch() {
    const dialogRef = this.modalService.open(AdvancedSearchModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((closed: AdvanceSearchConfig) => {
        if (closed.search) {
          const recipeQuery: RecipeSearchBundle = {
            name: closed.name,
            tags: closed.tags,
          }
          this.dashboardState.searchRecipeParamsChanged(recipeQuery);
        }
      });
  }

}
