import {ApiConnector} from './api-connector';
import {Model} from '../model/model';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';
import {HttpClient} from '@angular/common/http';

export class CachedApiConnector<T extends Model> extends ApiConnector<T> {
  protected cache: Map<string, T> = new Map<string, T>();
  protected fetchedPages: string[];
  private readonly PAGE_SIZE = 100;

  constructor(
    storage: StorageService,
    client: HttpClient,
    baseUrl: string,
  ) {
    super(storage, client, baseUrl);
    this.fetchedPages = [];
  }

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

  protected create(entity: Partial<T>): Observable<Partial<T>> {
    return super.create(entity)
      .pipe(
        tap((createdEntity) => {
          this.fetchedPages.push(createdEntity._id);
          this.cache[createdEntity._id.toString()] = createdEntity;
        }),
      );
  }

  update(entity: Partial<T>): Observable<Partial<T>> {
    return super.update(entity)
      .pipe(
        tap((savedEntity) => {
          if (this.cacheEntity(savedEntity)) {
            this.cache[savedEntity._id.toString()] = savedEntity;
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

  // public list(page: number, query?: any): Observable<(Partial<T> | T)[]> {
  //   if (!!query) {
  //     // client side caching is gonna be hard, so hit the server instead
  //     // @TODO -- do we want to put the results into the cache?
  //     return super.list(page, query);
  //   }
  //   const lowerSlice = page * this.PAGE_SIZE;
  //   const upperSlice = (page + 1) * this.PAGE_SIZE;
  //   const keysSlice = this.fetchedPages.slice(lowerSlice, upperSlice);
  //
  //   if (keysSlice.length === 0) {
  //     return this.regularFetch(page, query, lowerSlice)
  //   } else {
  //     const entities = keysSlice.map((entityId) => {
  //       return this.cache[entityId];
  //     });
  //     return of(entities);
  //   }
  // }
  //
  // private regularFetch(page, query, lowerSlice) {
  //   return super.list(page, query)
  //     .pipe(
  //       tap((results) => {
  //         results.forEach((entity) => {
  //           // put the keys into the cache
  //           this.cache[entity._id.toString()] = entity;
  //         });
  //         // sparsely populate the keys
  //         for (let i = 0; i < Math.min(results.length, this.PAGE_SIZE); i++) {
  //           this.fetchedPages[lowerSlice + i] = results[i]._id;
  //         }
  //       }),
  //     );
  // }

  protected cacheEntity(entity: Partial<T>): boolean {
    return false;
  }

  public clearCache() {
    this.cache = new Map();
  }
}
