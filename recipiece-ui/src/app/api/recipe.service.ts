import {Injectable} from '@angular/core';
import {IRecipe} from './model/recipe';
import {StorageService} from '../services/storage.service';
import {HttpClient} from '@angular/common/http';
import {ApiConnector} from './classes/api-connector';

@Injectable()
export class RecipeService extends ApiConnector<IRecipe> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(storage, client, 'recipes');
  }
}
