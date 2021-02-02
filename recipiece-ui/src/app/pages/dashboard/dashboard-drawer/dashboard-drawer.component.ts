import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IRecipeBook} from '../../../api/model/recipe-book';
import {DashboardStateService} from '../dashboard-state.service';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';

@Component({
  selector: 'app-dashboard-drawer',
  templateUrl: './dashboard-drawer.component.html',
  styleUrls: ['./dashboard-drawer.component.sass'],
})
export class DashboardDrawerComponent implements OnInit {
  @Input() recipeBooks: Partial<IRecipeBook>[] = [];
  @ViewChild('books') booksList: MatSelectionList;

  constructor(
    private dashboardState: DashboardStateService,
  ) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 200; i++) {
      this.recipeBooks.push({
        name: `test ${i}`,
        description: `description ${i}`,
        recipes: [],
      });
    }
  }

  public handleSelectionChange() {
    this.dashboardState.selectedBook = this.booksList.selectedOptions.selected[0]?.value;
  }

}
