import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Model} from './model/model';

export class ApiConnector<T extends Model> {
  constructor(
    protected client: HttpClient,
    protected storage: StorageService,
    protected baseUrl: string,
  ) {
  }

  public getById(id: number): Observable<Partial<T>> {
    const url = `${this.baseUrl}/${id}`;
    return this.client.get(this.getFullUrl(url), {headers: this.getHeaders()})
      .pipe(
        map((result) => {
          return result as T;
        }),
      );
  }

  public save(entity: Partial<T>): Observable<Partial<T>> {
    if (!!entity.id) {
      return this.update(entity);
    } else {
      return this.create(entity);
    }
  }

  protected create(entity: Partial<T>): Observable<Partial<T>> {
    const url = `${this.baseUrl}/`;
    return this.client.post(this.getFullUrl(url), entity, {headers: this.getHeaders()})
      .pipe(
        map((result) => {
          return result as Partial<T>;
        }),
      );
  }

  protected update(entity: Partial<T>): Observable<Partial<T>> {
    const url = `${this.baseUrl}/${entity.id}`;
    return this.client.put(this.getFullUrl(url), entity, {headers: this.getHeaders()})
      .pipe(
        map((result) => {
          return result as Partial<T>;
        }),
      );
  }

  public delete(entityId: number): Observable<any> {
    return this.client.delete(this.getFullUrl(`${this.baseUrl}/`));
  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const session = this.storage.session;
    if (!!session.token && !!session.id) {
      headers = headers.set('Authorization', `Bearer ${session.token}`);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  protected getFullUrl(url: string): string {
    return `${environment.apiHost}/${url}`;
  }

}
