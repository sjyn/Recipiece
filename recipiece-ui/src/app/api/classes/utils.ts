import {environment} from '../../../environments/environment';

export function getFullUrl(url: string): string {
  return `${environment.api.protocol}://${environment.host}:${environment.api.port}/${url}`;
}

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}
