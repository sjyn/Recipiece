import {Injectable} from '@angular/core';
import {ApiConnector} from './classes/api-connector';
import {IShoppingList} from './model/shopping-list';
import {StorageService} from '../services/storage.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ShoppingListService extends ApiConnector<IShoppingList> {

  constructor(
    storage: StorageService,
    client: HttpClient,
  ) {
    super(storage, client, 'shopping-lists');
  }
}
