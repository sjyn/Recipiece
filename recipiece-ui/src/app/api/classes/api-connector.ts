import {Observable} from 'rxjs';
import {StorageService} from '../../services/storage.service';
import {Model} from '../model/model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {nou} from '../../classes/utils';

export class ApiConnector<T extends Model> {
  constructor(
    public storage: StorageService,
    public client: HttpClient,
    public readonly baseUrl: string,
  ) {
  }

  public getById(id: string): Observable<Partial<T>> {
    return this.client.get(this.getFullUrl(`${this.baseUrl}/${id}`), {
      headers: this.getHeaders(),
    }).pipe(
      map((response: any) => {
        return response.data;
      }),
    );
  }

  public save(entity: Partial<T>): Observable<Partial<T>> {
    if (!!entity._id) {
      return this.update(entity);
    } else {
      return this.create(entity);
    }
  }

  protected create(entity: Partial<T>): Observable<Partial<T>> {
    return this.client.post(this.getFullUrl(`${this.baseUrl}/`), entity, {
      headers: this.getHeaders(),
    }).pipe(
      map((response: any) => {
        const created = response.data as Partial<T>;
        entity._id = created._id;
        return entity;
      }),
    );
  }

  protected update(entity: Partial<T>): Observable<Partial<T>> {
    return this.client.put(this.getFullUrl(`${this.baseUrl}/${entity._id}`), entity, {
      headers: this.getHeaders(),
    }).pipe(
      map((response: any) => {
        return response.data;
      }),
    );
  }

  public delete(entityId: string): Observable<any> {
    return this.client.delete(this.getFullUrl(`${this.baseUrl}/${entityId}`), {
      headers: this.getHeaders(),
    });
  }

  public list(page: number, query?: any): Observable<(T | Partial<T>)[]> {
    const url = this.getFullUrl(`${this.baseUrl}/list/${this.storage.session._id}`);

    const options = {
      headers: this.getHeaders(),
    };

    if (!nou(query)) {
      options['params'] = {
        query: JSON.stringify(query)
      };
    }

    return this.client.get(url, options).pipe(
      map((response: any) => {
        return response.data;
      }),
    );
  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (this.storage.loggedIn) {
      headers = headers.set('Authorization', `Bearer ${this.storage.session.token}`);
    }
    return headers;
  }

  protected getFullUrl(url: string): string {
    return `${environment.api.protocol}://${environment.host}:${environment.api.port}/${url}`;
  }

}
