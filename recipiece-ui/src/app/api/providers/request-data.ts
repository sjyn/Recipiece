export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export class RequestData {
  public paths: string[];
  public method: RequestMethod;

  constructor() {
    this.paths = [];
    this.method = undefined;
  }
}

export class RequestDataBuilder {
  private readonly request: RequestData;

  constructor() {
    this.request = new RequestData();
  }

  public withMethod(method: RequestMethod): RequestDataBuilder {
    this.request.method = method;
    return this;
  }

  public withPathParts(...parts: string[]): RequestDataBuilder {
    this.request.paths = parts;
    return this;
  }

  public build(): RequestData {
    return this.request;
  }
}

