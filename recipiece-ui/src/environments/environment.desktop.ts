import {IEnvironment} from './i-environment';

export const environment: IEnvironment = {
  host: 'localhost',
  pageSize: 100,
  api: {
    port: 4200,
    protocol: 'localhost',
  },
  production: false,
  desktop: true,
};
