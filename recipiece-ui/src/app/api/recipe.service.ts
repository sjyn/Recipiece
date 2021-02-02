import {Injectable} from '@angular/core';
import {IRecipe} from './model/recipe';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {StorageService} from '../services/storage.service';
import {CachedApiConnector} from './cached-api-connector';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends CachedApiConnector<IRecipe> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(client, storage, 'recipes');
  }

  public listForUser(page: number): Observable<Partial<IRecipe>[]> {
    // order from the server is consistent, so we can rely on what's in the cache
    // if we have more than the upper page limit, we already have that page
    const ownedRecipes = Object.values(this.cache);
    const upperBound = page * environment.pageSize;
    if (ownedRecipes.length >= upperBound) {
      const lowerBound = (page - 1) * environment.pageSize;
      return of(ownedRecipes.slice(lowerBound, upperBound));
    } else {
      const userId = this.storage.session?.id;
      const url = this.getFullUrl(`${this.baseUrl}/list/${userId}`);
      const params = {page: page.toString(10)};
      return this.client.get(url, {headers: this.getHeaders(), params})
        .pipe(
          map((response: any) => {
            return response.data as Partial<IRecipe>[];
          }),
          tap((results) => {
            results.forEach((r) => {
              this.cache[r.id] = r;
            });
          }),
        );
    }
  }

  protected cacheEntity(entity: Partial<IRecipe>): boolean {
    // only cache entities we own
    return entity.owner === this.storage.session?.id;
  }
}
