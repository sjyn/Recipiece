import {Injectable} from '@angular/core';
import {IRecipeBook} from './model/recipe-book';
import {StorageService} from '../services/storage.service';
import {Observable} from 'rxjs';
import {IRecipe} from './model/recipe';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {getFullUrl} from './classes/utils';
import {CachedApiConnector} from './classes/cached-api-connector';

@Injectable()
export class RecipeBookService extends CachedApiConnector<IRecipeBook> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(storage, client, 'books');
  }

  public listRecipesForBook(bookId: string, page: number): Observable<Partial<IRecipe>[]> {
    const url = getFullUrl(`${this.baseUrl}/${bookId}/list`);
    const options = {headers: this.getHeaders(), params: {page: page.toString()}};
    return this.client.get(url, options)
      .pipe(
        map((result: any) => {
          return result.data;
        }),
      );
  }
}
