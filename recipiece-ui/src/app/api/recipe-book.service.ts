import {Injectable} from '@angular/core';
import {IRecipeBook} from './model/recipe-book';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../services/storage.service';
import {CachedApiConnector} from './cached-api-connector';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IRecipe} from './model/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService extends CachedApiConnector<IRecipeBook> {

  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(client, storage, 'books');
  }

  public listRecipesForBook(bookId: string, page: number): Observable<Partial<IRecipe>[]> {
    const url = this.getFullUrl(`${this.baseUrl}/${bookId}/list`);
    const options = {headers: this.getHeaders(), params: {page: page.toString()}};
    return this.client.get(url, options)
      .pipe(
        map((result: any) => {
          return result.data;
        }),
      );
  }
}
