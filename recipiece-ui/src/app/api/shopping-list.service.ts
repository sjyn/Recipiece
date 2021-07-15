import {Injectable} from '@angular/core';
import {IShoppingList} from './model/shopping-list';
import {StorageService} from '../services/storage.service';
import {HttpClient} from '@angular/common/http';
import {CachedApiConnector} from './classes/cached-api-connector';

@Injectable()
export class ShoppingListService extends CachedApiConnector<IShoppingList> {

  constructor(
    storage: StorageService,
    client: HttpClient,
  ) {
    super(storage, client, 'shopping-lists');
  }
}
