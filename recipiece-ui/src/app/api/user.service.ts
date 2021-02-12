import {Injectable} from '@angular/core';
import {ApiConnector} from './api-connector';
import {IUser} from './model/user';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../services/storage.service';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {ISession} from './model/session';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiConnector<IUser> {

  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(client, storage, 'users');
  }

  public loginUser(email: string, password: string, remember: boolean): Observable<ISession> {
    this.storage.remember = remember;
    const url = `${this.baseUrl}/login`;
    const body = {email, password};
    const headers = this.getHeaders().delete('Authorization');
    return this.client.post(this.getFullUrl(url), body, {headers: headers})
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
    const headers = this.getHeaders().delete('Authorization');
    return this.client.post(this.getFullUrl(url), user, {headers: headers})
      .pipe(
        map((response: any) => {
          const session = response.data as ISession;
          this.storage.session = session;
          return session;
        }),
      );
  }

  public logoutUser(): Observable<any> {
    const url = this.getFullUrl(`${this.baseUrl}/logout`);
    return this.client.post(url, null, {headers: this.getHeaders()})
      .pipe(
        tap(() => {
          this.storage.logoutUser();
        }),
      );
  }

  public logoutEverywhere(): Observable<any> {
    const url = this.getFullUrl(`${this.baseUrl}/logout-everywhere`);
    return this.client.post(url, null, {headers: this.getHeaders()})
      .pipe(
        tap(() => {
          this.storage.logoutUser();
        }),
      );
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = this.getFullUrl(`${this.baseUrl}/${this.storage.session._id}/password-change`);
    const body = {new: newPassword, old: oldPassword};
    return this.client.post(url, body, {headers: this.getHeaders()});
  }

  public delete(entityId: string): Observable<any> {
    return super.delete(entityId)
      .pipe(
        tap(() => {
          this.storage.logoutUser();
        }),
      );
  }
}
