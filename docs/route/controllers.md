---
id: controllers
title: Controllers
sidebar_label: Controllers
---

Controllers are classes that handle routes request.
In order for the router to be able to handle the request, a controller class must extend `Controller`.
Each controller action will be called with `IRequest` and `IResponse` objects.

controller action can return a promise or an object that will be passed to `res.send(someData)` with status code 200

## Request Controller
By default, `appolo` creates a new controller instance for every request.
```typescript
import {inject,Controller} from '@appolo/inject';
import {controller,Controller,IRequest,IResponse,post,get} from '@appolo/route';

@controller()
export class LoginController extends Controller{
    @inject() authManager:AuthManager;

    @post("/login/")
    public async loginUser(req:IRequest,res:IResponse){
        return  await this.authManager.validateUser(req.body.username,req.body.password)
    }

    @get("/some/data")
    public async loginUser(req:IRequest,res:IResponse,model:any){
        return  {some:"data"}
    }

    @get("/some/data2")
    public  loginUser(req:IRequest,res:IResponse){
        res.status(200).send({some:"data"})
    }
    
    @get("/some/data3")
    public  loginUser(@query query:any){
        res.status(200).send(query)
    }

}
```

## Static Controllers
If you do not need a new controller instance for every request, you can inherit from `StaticController` which is singleton and created once.
```typescript
import {singleton,inject,lazy} from '@appolo/inject';
import {controller,StaticController,IRequest,IResponse} from '@appolo/route';
@controller()
@singleton()
@lazy()
export class LoginController extends StaticController{
    @inject() authManager:AuthManager;

    @post("/login/")
    public aynsc loginUser(req:IRequest,res:IResponse){
        return await this.authManager.validateUser(req.body.username,req.body.password)
	}
}

```

## Methods
supported http methods
 - `@get`
 - `@post`
 - `@patch`
 - `@patch`
 - `@put`
 - `@del`
 - `@purge`
 
 
 multi methods and paths on the same action also supported
 ```typescript
 import {inject,Controller} from '@appolo/inject';
 import {controller,Controller,IRequest,IResponse,post,get,mode} from '@appolo/route';
 
 @controller()
 export class SomeController extends Controller{
     
     @get("/some/data")
     @post("/some/data")
     @post("/some/data2")
     public async loginUser(@mode() model :any){
         return  model // {...req.query, ...req.body}
     }
 
 }
 ```

## API
### send
#### send(statusCode?: number, data?: any)
send response with status and optional data 
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.send(200,"ok")
     }
 
 }
 ```
### sendOk
#### sendOk(data?: any)
send response with status 200 optional data 
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.sendOk("ok")
     }
 
 }
 ```

### sendCreated
#### sendCreated(data?: any)
send response with status 201 optional data 
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.sendCreated("ok")
     }
 
 }
 ```

### sendNoContent
#### sendNoContent()
send response with status 204
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.sendNoContent()
     }
 
 }
 ```

### sendError
#### sendError(error?: Error | string, code?: number, data?: any)
send response error with status  500
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
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
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.sendBadRequest(new Error("some error"))
     }
 }
 ```

### sendUnauthorized
#### sendUnauthorized(error?: Error | string, code?: number, data?: any)
send response error `UnauthorizedError` with status  401
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.sendUnauthorized(new Error("some error"))
     }
 }
 ```

### sendNotFound
#### sendNotFound(error?: Error | string, code?: number, data?: any)
send response error `NotFoundError` with status  404
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(@mode() model :any){
         return this.sendNotFound(new Error("some error"))
     }
 }
 ```

### getModel
#### getModel(): T
return combined object of `req.query`, `req.body` and `req.params`
 ```typescript
  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     public async getData(){
         return this.send(this.getModel())
     }
 }
 ```


