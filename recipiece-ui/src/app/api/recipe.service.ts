import {Injectable} from '@angular/core';
import {IRecipe} from './model/recipe';
import {StorageService} from '../services/storage.service';
import {HttpClient} from '@angular/common/http';
import {CachedApiConnector} from './classes/cached-api-connector';

@Injectable()
export class RecipeService extends CachedApiConnector<IRecipe> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(storage, client, 'recipes');
  }
}
