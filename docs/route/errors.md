---
id: errors
title: Errors
sidebar_label: Errors
---

by default the response will be wrapped with try catch and `InternalServerError` will be sent to response.
```typescript
{
    "status": 500,
    "message": "Bad Request",
    "error": "Internal Server Error"
}
```
or you can throw custom error
```typescript
import {inject} from '@appolo/inject';
import {controller,Controller,IRequest,IResponse} from '@appolo/route';

@controller()
export class LoginController extends Controller{
    @inject() authManager:AuthManager;
    @post("/login/")
    public async loginUser(req:IRequest,res:IResponse){
        try{
            return  await this.authManager.validateUser(req.body.username,req.body.password)
        }catch(e){
            throw new HttpError(401,"Not Found",e,{key:"value"},1000)
        }
    }
}
```

```typescript
{
    "status": 401,
    "message": "Not Foundr",
    "error":"something is wrong",
    "code":1001,
    "key":"value"
}
```

## Error Middleware
you can define custom error middleware to handle route error.
any express error middleware are also supported

```typescript
import {controller,Controller,IRequest,IResponse,error} from '@appolo/route';

@controller()
@error(SomeErrorHandler)
export class SomeController extends Controller{
    @post("/some/path")
    public async action(req:IRequest,res:IResponse){
       throw new Error("some error")
    }
}
```

```typescript
import {inject,IRequest,IResponse,error,Middleware} from '@appolo/route';
import {inject,define} from '@appolo/inject';

@define()
export class SomeErrorHandler extends Middleware{

    catch(err:any,req:IRequest,res:IResponse,next:NextFn){
        res.status(400).send("something went wrong")
    }
}
```

## Global Error handler
The global middleware will be run on all routes

in config/middlewares/all.ts
```typescript
export = function (app: App) {

    app.route.error(function(err:any,req:IRequest,res:IResponse,next:NextFn){
        console.log(err)
    });

    app.route.error(SomeErrorHandler);
}
```

## Not Found Route
when route is not found HttpError is thrown with status 404
you can catch the error by `get('*')` route or by error middleware

in config/middlewares/all.ts
```typescript
export = function (app: App) {

    app.route.error(function(err:any,req:IRequest,res:IResponse,next:NextFn){
        if(err instanceof HttpError && err.statusCode == 404){
            res.render("404.html")
        }
    });
}
```

## Error Stack
you can enable the stack error message in development
```typescript
let  {App}  from '@appolo/core';

(function async (){

  let app = await App.create({
        stackError : process.env.NODE_ENV == 'development'
    }).launch();

})();
```
