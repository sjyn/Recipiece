import {Injectable} from '@angular/core';
import {IShoppingList} from './model/shopping-list';
import {StorageService} from '../services/storage.service';
import {HttpClient} from '@angular/common/http';
import {CachedApiConnector} from './classes/cached-api-connector';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ShoppingListService extends CachedApiConnector<IShoppingList> {

  constructor(
    storage: StorageService,
    client: HttpClient,
  ) {
    super(storage, client, 'shopping-lists');
  }

  public generateSharingToken(listId: string, toEmail: string): Observable<string> {
    const url = `${this.baseUrl}/share/${listId}`;
    const data = {
      email: toEmail,
    };
    return this.client.post(this.getFullUrl(url), data, {
      headers: this.getHeaders(),
    }).pipe(
      map((response: any) => {
        return response.data;
      }),
    );
  }
}
