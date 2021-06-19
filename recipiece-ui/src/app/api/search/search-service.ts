import {Model} from '../model/model';
import {ApiConnector} from '../api-connector';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

export abstract class SearchService<T extends Model> {
  public searchResults: Observable<T[]>;
  private searchSubject: Subject<string>;

  protected constructor(
    protected api: ApiConnector<T>,
  ) {
    this.searchSubject = new Subject<string>();
    this.searchResults = this.searchSubject.pipe(
      debounceTime(500),
      switchMap((searchTerm: string) => {
        return this.makeSearchRequest(searchTerm);
      }),
    );
  }

  public search(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  protected makeSearchRequest(searchTerm: string): Observable<T[]> {
    const url = this.api.getFullUrl(`${this.api.baseUrl}/list/${this.api.storage.session._id}`);
    // gen the params object
    const params = new HttpParams().append('query', this.generateQuery(searchTerm).toString());
    const options = {
      headers: this.api.getHeaders(),
      params: params,
    };
    return this.api.client.get(url, options)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
      );
  }

  protected abstract generateQuery(searchTerm: string): HttpParams;
}
