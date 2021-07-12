import {Injectable} from '@angular/core';
import {IUser} from './model/user';
import {StorageService} from '../services/storage.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ISession} from './model/session';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getFullUrl} from './classes/utils';
import {ApiConnector} from './classes/api-connector';

@Injectable()
export class UserService extends ApiConnector<IUser> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(storage, client, 'users');
  }

  public loginUser(email: string, password: string, remember: boolean): Observable<ISession> {
    this.storage.remember = remember;
    const url = `${this.baseUrl}/login`;
    const body = {email, password};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.client.post(getFullUrl(url), body, {headers: headers})
      .pipe(
        map((response: any) => {
          const session = response.data as ISession;
          this.storage.session = session;
          return session;
        }),
      );
  }

  public createUser(user: Partial<IUser>, remember: boolean): Observable<ISession> {
    this.storage.remember = remember;
    const url = `${this.baseUrl}/`;
    return this.client.post(this.getFullUrl(url), user, {headers: this.getHeaders()})
      .pipe(
        map((response: any) => {
          const session = response.data as ISession;
          this.storage.session = session;
          return session;
        }),
      );
  }

  public logoutUser(): Observable<any> {
    const url = getFullUrl(`${this.baseUrl}/logout`);
    return this.client.post(url, null, {headers: this.getHeaders()})
      .pipe(
        tap(() => {
          this.storage.logoutUser();
        }),
      );
  }

  public logoutEverywhere(): Observable<any> {
    const url = getFullUrl(`${this.baseUrl}/logout-everywhere`);
    return this.client.post(url, null, {headers: this.getHeaders()})
      .pipe(
        tap(() => {
          this.storage.logoutUser();
        }),
      );
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = getFullUrl(`${this.baseUrl}/${this.storage.session._id}/password-change`);
    const body = {new: newPassword, old: oldPassword};
    return this.client.post(url, body, {headers: this.getHeaders()});
  }
}
