declare module 'claudia-api-builder'{
  class ApiResponse{
      public constructor(response : any, headers : any, code?: any);
  }
  export default class ApiBuilder {
      public static ApiResponse : typeof ApiResponse;
      get(uri : string, callback : Function) : void;
      put(uri : string, callback : Function) : void;
      post(uri : string, callback : Function) : void;
  }
}