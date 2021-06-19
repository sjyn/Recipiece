import {Injector, NgModule} from '@angular/core';
import {environment} from '../../environments/environment';
import {IndexedDbWrapperService} from './providers/indexed-db-wrapper.service';
import {HttpWrapperService} from './providers/http-wrapper.service';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from './recipe.service';
import {RecipeBookService} from './recipe-book.service';
import {UserService} from './user.service';
import {StorageService} from '../services/storage.service';

@NgModule({
  providers: [
    {
      provide: 'DataClient', useFactory: (injector: Injector) => {
        if(environment.desktop === true) {
          return new IndexedDbWrapperService();
        } else {
          return new HttpWrapperService(injector.get(HttpClient), injector.get(StorageService))
        }
      },
    },
    RecipeService,
    RecipeBookService,
    UserService,
  ],
})
export class ApiModule {
}
