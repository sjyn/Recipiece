import {Injectable} from '@angular/core';
import {ISession} from '../api/model/session';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public get loggedIn(): boolean {
    return !!this.session?.token && !!this.session?.id;
  }

  public get session(): ISession {
    const storage = this.remember ? localStorage : sessionStorage;
    const token = storage.getItem(this.genKey('token'));
    const id = +storage.getItem(this.genKey('id'));
    return {token, id};
  }

  public set session(session: ISession) {
    const storage = this.remember ? localStorage : sessionStorage;
    storage.setItem(this.genKey('token'), session.token);
    storage.setItem(this.genKey('id'), session.id.toString(10));
  }

  public get remember(): boolean {
    const val = localStorage.getItem(this.genKey('remember'));
    if (val === null || val === undefined) {
      return false;
    }
    return val === true.toString();
  }

  public set remember(r: boolean) {
    localStorage.setItem(this.genKey('remember'), r.toString());
  }

  constructor() {
  }

  private genKey(postfix: string): string {
    return `recipeice-${postfix}`;
  }
}
