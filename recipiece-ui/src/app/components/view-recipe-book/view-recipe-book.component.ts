import {Component, Input, OnInit} from '@angular/core';
import {IRecipeBook} from '../../api/model/recipe-book';

@Component({
  selector: 'app-view-recipe-book',
  templateUrl: './view-recipe-book.component.html',
  styleUrls: ['./view-recipe-book.component.sass']
})
export class ViewRecipeBookComponent implements OnInit {
  @Input() recipeBook: IRecipeBook;

  constructor() { }

  ngOnInit(): void {
  }

}
