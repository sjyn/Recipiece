import {Injectable} from '@angular/core';
import {IRecipe} from '../../api/model/recipe';

@Injectable()
export class ConfigManagerService {
  public recipe: IRecipe;

  constructor() {
  }
}
