import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IRecipeBook} from '../../../api/model/recipe-book';
import {DashboardStateService} from '../dashboard-state.service';
import {MatSelectionList} from '@angular/material/list';
import {MatDialog} from '@angular/material/dialog';
import {CreateRecipeBookModalComponent} from '../modals/create-recipe-book-modal/create-recipe-book-modal.component';
import {RecipeBookService} from '../../../api/recipe-book.service';
import {take} from 'rxjs/operators';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteRecipeBookModalComponent} from '../modals/delete-recipe-book-modal/delete-recipe-book-modal.component';
import {IRecipe} from '../../../api/model/recipe';

@Component({
  selector: 'app-dashboard-drawer',
  templateUrl: './dashboard-drawer.component.html',
  styleUrls: ['./dashboard-drawer.component.sass'],
})
export class DashboardDrawerComponent implements OnInit {
  public loading: boolean;
  public recipeBooks: IRecipeBook[];
  public draggedBookId: string;
  @ViewChild('books') booksList: MatSelectionList;

  public currentPage: number;

  constructor(
    private dashboardState: DashboardStateService,
    private dialogService: MatDialog,
    private recipeBookService: RecipeBookService,
    private clipboard: Clipboard,
    private snackbarService: MatSnackBar,
    private modalService: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.currentPage = 0;
    this.loadBookPage();
  }

  private loadBookPage() {
    this.loading = true;
    this.recipeBookService.listForUser(this.currentPage)
      .pipe(take(1))
      .subscribe((results: IRecipeBook[]) => {
        this.recipeBooks = results;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  public handleSelectionChange() {
    this.dashboardState.selectedBook = this.booksList.selectedOptions.selected[0]?.value;
  }

  public createRecipeBook() {
    const modalRef = this.dialogService.open(CreateRecipeBookModalComponent, {
      minWidth: '300px',
    });
    modalRef.afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result !== null && result !== undefined) {
          this.recipeBookService.save(result as IRecipeBook)
            .pipe(take(1))
            .subscribe((created: IRecipeBook) => {
              this.recipeBooks.push(created);
            });
        }
      });
  }

  public copyBookLink(recipeBook: IRecipeBook) {
    // const url = `${environment.serve.protocol}://${environment.host}:${environment.serve.port}/books/${recipeBook._id}`;
    // this.clipboard.copy(url);
    // const message = `A link to ${recipeBook.name} was copied to your clipboard`;
    // this.snackbarService.open(message, 'OK', {duration: 2000});
  }

  public deleteRecipeBook(recipeBook: IRecipeBook) {
    const modalRef = this.modalService.open(DeleteRecipeBookModalComponent, {
      data: {book: recipeBook},
    });
    modalRef.afterClosed()
      .pipe(take(1))
      .subscribe((shouldDelete: boolean) => {
        if (shouldDelete === true) {
          this.recipeBookService.delete(recipeBook._id)
            .pipe(take(1))
            .subscribe(() => {
              this.recipeBooks = this.recipeBooks.filter((b) => b._id != recipeBook._id);
            });
        }
      });
  }

  public recipeDropped(event, recipeBook: IRecipeBook, bookIndex: number) {
    event.preventDefault();
    this.draggedBookId = undefined;
    const recipe: IRecipe = JSON.parse(event.dataTransfer.getData('text'));
    if (!recipeBook.recipes.includes(recipe._id)) {
      recipeBook.recipes.push(recipe._id);
      this.recipeBookService.save(recipeBook)
        .pipe(take(1))
        .subscribe((savedBook: IRecipeBook) => {
          this.recipeBooks[bookIndex] = savedBook;
        });
    }
  }

  public allowDrop(event) {
    event.preventDefault();
  }

  public dragEntered(event, recipeBook: IRecipeBook) {
    event.preventDefault();
    const recipe: IRecipe = JSON.parse(event.dataTransfer.getData('text'));
    if (!recipeBook.recipes.includes(recipe._id)) {
      this.draggedBookId = recipeBook._id;
    }
  }

  public dragExited(event, recipeBook: IRecipeBook) {
    event.preventDefault();
    this.draggedBookId = undefined;
  }

}
