export interface IEnvironment {
  production: boolean,
  desktop: boolean,
  host: string,
  pageSize: number,
  api: {
    protocol: string,
    port: number,
  },
}
