import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';
import {IDataProxy} from './data-proxy';
import {Model} from '../model/model';

@Injectable()
export class IndexedDbWrapperService implements IDataProxy {
  public readonly databaseVersion = 1;
  public readonly databaseName = 'recipiece';
  public $database: Subject<IDBDatabase>;
  private openRequest: IDBOpenDBRequest;

  constructor() {
    this.$database = new ReplaySubject();
    this.openDb();
  }

  public create<T extends Model>(store: string, entity: T): Observable<T> {
    entity._id = entity._id || uuidv4();
    return this.$database.pipe(
      switchMap((db: IDBDatabase) => {
        const transaction = db.transaction(store, 'readwrite');
        const objectStore = transaction.objectStore(store);
        const request = objectStore.add(entity, entity._id);
        return new Observable<T>((s) => {
          request.onsuccess = () => {
            s.next(entity);
          };
          request.onerror = (event) => {
            s.error(event);
          };
        });
      }),
    );
  }

  public update<T extends Model>(store: string, entity: T): Observable<T> {
    return this.$database.pipe(
      switchMap((db: IDBDatabase) => {
        const transaction = db.transaction(store, 'readwrite');
        const objectStore = transaction.objectStore(store);
        const request = objectStore.put(entity, entity._id);
        return new Observable<T>((s) => {
          request.onsuccess = () => {
            s.next(entity);
          };
          request.onerror = (event) => {
            s.error(event);
          };
        });
      }),
    );
  }

  public get<T extends Model>(store: string, id: string): Observable<T | undefined> {
    return this.$database.pipe(
      switchMap((db: IDBDatabase) => {
        const transaction = db.transaction(store, 'readonly');
        const objectStore = transaction.objectStore(store);
        const request = objectStore.get(id);
        return new Observable<T>((s) => {
          request.onsuccess = () => {
            s.next(request.result);
          };
          request.onerror = (event) => {
            s.error(event);
          };
        });
      }),
    );
  }

  public delete(store: string, id: string): Observable<never> {
    return this.$database.pipe(
      switchMap((db: IDBDatabase) => {
        const transaction = db.transaction(store, 'readwrite');
        const objectStore = transaction.objectStore(store);
        const request = objectStore.delete(id);
        return new Observable<never>((s) => {
          request.onsuccess = () => {
            s.next();
          };
          request.onerror = (event) => {
            s.error(event);
          };
        });
      }),
    );
  }

  public query<T extends Model>(destination: string, params: any): Observable<T[] | undefined> {
    return of();
  }

  // public getAllForUser<T>(store): Observable<T[]> {
  //   return this.$database.pipe(
  //     switchMap((db: IDBDatabase) => {
  //       const transaction = db.transaction(store, 'readonly');
  //       const objectStore = transaction.objectStore(store);
  //       const request = objectStore.getAll();
  //       return new Observable<T[]>((s) => {
  //         request.onsuccess = () => {
  //           s.next(request.result);
  //         };
  //         request.onerror = (event) => {
  //           s.error(event);
  //         };
  //       });
  //     }),
  //   );
  // }

  // public query<T extends IModel>(store, queryProps: object): Observable<T[]> {
  //   return this.$database.pipe(
  //     switchMap((db: IDBDatabase) => {
  //       const transaction = db.transaction(store, 'readonly');
  //       const objectStore = transaction.objectStore(store);
  //       const request = objectStore.openCursor();
  //       return new Observable<never>((s) => {
  //         request.onsuccess = () => {
  //           s.next();
  //         };
  //         request.onerror = (event) => {
  //           s.error(event);
  //         };
  //       });
  //     }),
  //   );
  // }

  private openDb() {
    this.openRequest = indexedDB.open(this.databaseName, this.databaseVersion);
    this.openRequest.onupgradeneeded = this.onUpgradeNeeded.bind(this);
    this.openRequest.onerror = (event) => {
      throw event;
    };
    this.openRequest.onsuccess = this.handleOpenSuccess.bind(this);
  }

  private onUpgradeNeeded(event: Event) {
    // setup the database here
    const db = this.openRequest.result;

    const recipeStore = db.createObjectStore('recipes');
    recipeStore.createIndex('recipe-name', 'name', {unique: false});

    const recipeBookStore = db.createObjectStore('recipe-books');
    recipeBookStore.createIndex('recipe-book-name', 'name', {unique: false});

    const tagStore = db.createObjectStore('tags');
    tagStore.createIndex('tag-name', 'name', {unique: true});

    // db.createObjectStore(Constants.database.EQUIPMENT);
    // db.createObjectStore(Constants.database.EQUIPMENT_SETS);

    this.$database.next(db);
  }

  private handleOpenSuccess(event: Event) {
    this.$database.next(this.openRequest.result);
  }
}
