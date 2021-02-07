import {Injectable} from '@angular/core';
import {IRecipe} from './model/recipe';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../services/storage.service';
import {CachedApiConnector} from './cached-api-connector';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends CachedApiConnector<IRecipe> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(client, storage, 'recipes');
  }

  protected cacheEntity(entity: Partial<IRecipe>): boolean {
    // only cache entities we own
    return entity.owner === this.storage.session?._id;
  }
}
