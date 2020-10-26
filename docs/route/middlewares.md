---
id: middlewares
title: Middlewares
sidebar_label: Middlewares
---

A middleware class will run before the action of the controller invoked.

## Class Middleware
The middleware class must extend `Middleware` and implement the run method.
if `run` return a promise next will be called automatically.
new middleware instance will be created or each request.

The middleware must implement one of the following methods:
- run - if its regular middleware
- error - if its error middleware
- runWithData - if its data middleware

```typescript
import {Middleware,IRequest,IResponse,NextFn,IRouteOptions} from '@appolo/route';
import {define,inject} from '@appolo/inject';

@define()
export class AuthMiddleware extends Middleware {
    @inject() authManager:AuthManager;
    public async run(req:IRequest,res:IResponse,next:NextFn,route:IRouteOptions){
        try{
            let user =  await this.authManager.validateToken(req.headers.authorization)
            req.user = user;
        }catch(e){
            this.sendUnauthorized();
        }
    }
    
    public async error(error:Error,req:IRequest,res:IResponse,next:NextFn,route:IRouteOptions){
        // if is error middlware
    }
    
    public runWithData(data: any, req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions): void {
        // if is error data middlware
    }
}
```

now you can add the middleware to our route
```typescript
@controller()
export class LoginController extends Controller{
    @post("/someroute/")
    @middaleware(AuthMiddleware)
    public async someAction(req:IRequest,res:IResponse){
        return req.user
    }
}
```

static middlewares supported same as static controllers and will be created once
```typescript
import {Middleware,IRequest,IResponse,NextFn,IRouteOptions} from '@appolo/route';
import {define,inject,singleton} from '@appolo/inject';
@define()
@singleton()
export class AuthMiddleware extends StaticMiddleware {
    @inject() authManager:AuthManager;
    public async run(req:IRequest,res:IResponse,next:NextFn,route:IRouteOptions){
        let user =  await this.authManager.validateToken(req.headers.authorization)
        req.user = user;
    }
}
```
## Express Middleware
you can also use any express or custom middleware functions
```typescript

const someMiddleware = (req,res,next)=>{
    req.user = "aa";
    next()
}
//async await supported
const someMiddleware2 = async (req,res)=>{
    //do somethig async
    req.user = "bb";
}

@controller()
export class LoginController extends Controller{
    @post("/someroute/")
    @middaleware(someMiddleware,someMiddleware2)
    public async someAction(req:IRequest,res:IResponse){
        return req.user // bb
    }
}
```


## Controller Middleware
when a middleware added on a controller it will be applied on all controller actions

```typescript

@define()
export class AuthMiddleware extends Middleware {
    @inject() authManager:AuthManager;
    public async run(req:IRequest,res:IResponse,next:NextFn,route:IRouteOptions){
     req.user  =  await this.authManager.validateToken(req.headers.authorization)
    }
}

@controller()
@middaleware(AuthMiddleware)
export class LoginController extends Controller{
    @post("/someroute/")
    public async someAction(req:IRequest,res:IResponse){
        return req.user 
    }
    @post("/someroute2/")
    public async someAction2(req:IRequest,res:IResponse){
        return req.user 
    }
}
```

## Global Middlewares
The middlewares will be used on all requests.
```typescript title="config/middlewares/all.ts"
import bodyParser = require("body-parser");
import {IRequest,IResponse,NextFn}  from '@appolo/route';
import {App}  from '@appolo/core';

function CorsMiddleware (req:IRequest, res: IResponse, next: NextFn) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
}

async function AsyncMiddleware (req:IRequest, res: IResponse, next: NextFn) {
    res.setHeader("my-header", "true");
}

function ErrorMiddleware(err:any,req:IRequest,res:IResponse,next:NextFn){
    if(err instanceof HttpError && err.statusCode == 404){
        res.render("404.html")
    }
}

export = function (app: App) {
    app.route.use(bodyParser.json());
    .use(AuthMiddleware);
    .use(CorsMiddleware).use(AsyncMiddleware)
    .error(ErrorMiddleware);
}
```

## API

### sendError
#### sendError(error?: Error | string, code?: number, data?: any)
send response error with status  500
 ```typescript
  
 @define()
 export class SomeMiddleware extends Middleware{
    
     public async run(@mode() model :any){
         return this.sendError(new Error("some error"))
     }
 }
 ```

 ```typescript title="error format"
 {
     "status": 500,
     "message": "Internal Server Error",
     "error": "some error"
 }
 ```

### sendBadRequest
#### sendBadRequest(error?: Error | string, code?: number, data?: any)
send response error `BadRequestError` with status  400
 ```typescript
  
 @define()
 export class SomeMiddleware extends Middleware{
    public async run(@mode() model :any){
         return this.sendBadRequest(new Error("some error"))
     }
 }
 ```

### sendUnauthorized
#### sendUnauthorized(error?: Error | string, code?: number, data?: any)
send response error `UnauthorizedError` with status  401
 ```typescript
  
 @define()
 export class SomeMiddleware extends Middleware{
    
     public async run(@mode() model :any){
         return this.sendUnauthorized(new Error("some error"))
     }
 }
 ```

### sendNotFound
#### sendNotFound(error?: Error | string, code?: number, data?: any)
send response error `NotFoundError` with status  404
 ```typescript
  
 @define()
 export class SomeMiddleware extends Middleware{
    
     public async run(@mode() model :any){
         return this.sendNotFound(new Error("some error"))
     }
 }
 ```

### getModel
#### getModel(): T
return combined object of `req.query`, `req.body` and `req.params`
 ```typescript
  
 @define()
 export class SomeMiddleware extends Middleware{
    
     public async getData(){
         return this.send(this.getModel())
     }
 }
 ```
