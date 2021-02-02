import {ApiConnector} from './api-connector';
import {Model} from './model/model';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

export class CachedApiConnector<T extends Model> extends ApiConnector<T> {
  protected cache: Map<number, T> = new Map<number, T>();

  getById(id: number): Observable<Partial<T>> {
    const cachedEntity = this.cache[id];
    if (!!cachedEntity) {
      return of(cachedEntity);
    } else {
      return super.getById(id)
        .pipe(
          tap((fetchedEntity) => {
            if (this.cacheEntity(fetchedEntity)) {
              // @ts-ignore
              this.cache[fetchedEntity.id] = fetchedEntity;
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
            this.cache[savedEntity.id] = savedEntity;
          }
        }),
      );
  }

  delete(entityId: number): Observable<any> {
    return super.delete(entityId)
      .pipe(
        tap(() => {
          delete this.cache[entityId];
        }),
      );
  }

  protected cacheEntity(entity: Partial<T>): boolean {
    return true;
  }

  public clearCache() {
    this.cache = new Map<number, T>();
  }
}
