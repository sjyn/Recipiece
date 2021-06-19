import {IEnvironment} from './i-environment';

export const environment: IEnvironment = {
  host: 'recipiece.org',
  pageSize: 100,
  api: {
    port: 80,
    protocol: 'https'
  },
  production: true,
  desktop: false
};
