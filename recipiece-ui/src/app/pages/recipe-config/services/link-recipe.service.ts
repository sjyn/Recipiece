import {Injectable} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';
import {MatDialog} from '@angular/material/dialog';
import {LinkRecipeModalComponent} from '../modals/link-recipe-modal/link-recipe-modal.component';
import {take} from 'rxjs/operators';

@Injectable()
export class LinkRecipeService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  public showDialog(parent: IRecipe) {
    const ref = this.dialog.open(LinkRecipeModalComponent, {
      data: parent,
      width: '300px'
    });
    ref.afterClosed()
      .pipe(take(1))
      .subscribe((idToLink: string) => {
        if (!!idToLink) {
          if (!!parent.links) {
            parent.links = [];
          }
          parent.links.push(idToLink);
        }
      });
  }
}
