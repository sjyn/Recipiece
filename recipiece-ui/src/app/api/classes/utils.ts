import {environment} from '../../../environments/environment';

export function getFullUrl(url: string): string {
  return `${environment.api.protocol}://${environment.host}:${environment.api.port}/${url}`;
}
