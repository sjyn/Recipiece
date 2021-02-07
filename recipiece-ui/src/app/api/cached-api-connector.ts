import {ApiConnector} from './api-connector';
import {Model} from './model/model';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IRecipe} from './model/recipe';
import {environment} from '../../environments/environment';

export class CachedApiConnector<T extends Model> extends ApiConnector<T> {
  protected cache: Map<number, T> = new Map<number, T>();

  getById(id: string): Observable<Partial<T>> {
    const cachedEntity = this.cache[id];
    if (!!cachedEntity) {
      return of(cachedEntity);
    } else {
      return super.getById(id)
        .pipe(
          tap((fetchedEntity) => {
            if (this.cacheEntity(fetchedEntity)) {
              // @ts-ignore
              this.cache[fetchedEntity._id] = fetchedEntity;
            }
          }),
        );
    }
  }

  update(entity: Partial<T>): Observable<Partial<T>> {
    return super.update(entity)
      .pipe(
        tap((savedEntity) => {
          if (this.cacheEntity(savedEntity)) {
            // @ts-ignore
            this.cache[savedEntity._id] = savedEntity;
          }
        }),
      );
  }

  delete(entityId: string): Observable<any> {
    return super.delete(entityId)
      .pipe(
        tap(() => {
          delete this.cache[entityId];
        }),
      );
  }

  public listForUser(page: number): Observable<Partial<T>[]> {
    // order from the server is consistent, so we can rely on what's in the cache
    // if we have more than the upper page limit, we already have that page
    const ownedRecipes = Object.values(this.cache);
    const lowerBound = (page) * environment.pageSize;
    if (ownedRecipes.length > lowerBound) {
      const upperBound = (page + 1) * environment.pageSize;
      return of(ownedRecipes.slice(lowerBound, upperBound));
    } else {
      const userId = this.storage.session?._id;
      const url = this.getFullUrl(`${this.baseUrl}/list/${userId}`);
      const params = {page: page.toString(10)};
      return this.client.get(url, {headers: this.getHeaders(), params})
        .pipe(
          map((response: any) => {
            return response.data as Partial<T>[];
          }),
          tap((results) => {
            results.forEach((r) => {
              if (this.cacheEntity(r)) {
                // @ts-ignore
                this.cache[r._id] = r;
              }
            });
          }),
        );
    }
  }

  protected cacheEntity(entity: Partial<T>): boolean {
    return true;
  }

  public clearCache() {
    this.cache = new Map<number, T>();
  }
}
