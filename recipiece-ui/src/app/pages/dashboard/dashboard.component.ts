import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiGlobalsService} from '../../services/ui-globals.service';
import {DashboardStateService} from './dashboard-state.service';
import {IRecipe} from '../../api/model/recipe';
import {DeleteRecipeModalComponent} from './modals/delete-recipe-modal/delete-recipe-modal.component';
import {switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {

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
  }

  public recipeEdited(recipe: IRecipe) {
    this.router.navigate(['config', recipe._id]);
  }

  public recipeViewed(recipe: IRecipe) {

  }

  public recipeDeleted(recipe: IRecipe) {
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

}
