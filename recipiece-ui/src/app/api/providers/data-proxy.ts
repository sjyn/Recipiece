import {Observable} from 'rxjs';
import {Model} from '../model/model';

export interface IDataProxy {
  create<T extends Model>(destination: string, entity: T): Observable<T>;

  update<T extends Model>(destination: string, entity: T): Observable<T>;

  get<T extends Model>(destination: string, id: string): Observable<T | undefined>;

  delete(destination: string, id: string): Observable<never>;

  query<T extends Model>(destination: string, params: any): Observable<T[] | undefined>;
}
