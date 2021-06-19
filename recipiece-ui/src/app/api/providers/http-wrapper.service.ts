import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IDataProxy} from './data-proxy';
import {Model} from '../model/model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class HttpWrapperService implements IDataProxy {

  constructor(
    private httpClient: HttpClient,
    private storageClient: StorageService,
  ) {

  }

  create<T extends Model>(destination: string, entity: T): Observable<T> {
    return this.httpClient.post(`${destination}/`, entity)
      .pipe(
        map((response: HttpResponse<T>) => {
          return response.body;
        }),
      );
  }

  delete(destination: string, id: string): Observable<never> {
    return undefined;
  }

  get<T extends Model>(destination: string, id: string): Observable<T | undefined> {
    return undefined;
  }

  query<T extends Model>(destination: string, params: any): Observable<T[] | undefined> {
    return undefined;
  }

  update<T extends Model>(destination: string, entity: T): Observable<T> {
    return undefined;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const session = this.storageClient.session;
    if (!!session.token && !!session._id) {
      headers = headers.set('Authorization', `Bearer ${session.token}`);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  private getFullUrl(url: string): string {
    return `${environment.api.protocol}://${environment.host}:${environment.api.port}/${url}`;
  }
}
