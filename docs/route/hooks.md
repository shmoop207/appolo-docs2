---
id: hooks
title: Hooks
sidebar_label: Hooks
---
Appolo Hooks allows you to add custom middleware request lifecycle

## Lifecycle

- `OnRequest` - request initialized with query parse and params
- `PreMiddleware` - run global middlewares and action middlewares
- `PreHandler` - run controller action
- `onSend` - prepare send response (gzip,headers...)
- `onResponse` - send response and headers

## Usage
### App
hooks defined using the `app` `addHook` method
```typescript
import {Hooks} from '@appolo/route';

export = function (app: App) {
     app.route.hooks.addHook(Hooks.OnRequest,function(req,res,next) {
        //do something
        next()
     });
    
    app.route.hooks.onRequest(async (req,res)=> {
        //do something
     })

}
```
### Routes
hooks can be added on routes using the `hook` decorator
```typescript
import {controller,Controller,IRequest,IResponse,Middleware} from '@appolo/route';
import {define,inject} from '@appolo/inject';


@define()
export class SomeMiddleware extends Middleware {
    @inject() authManager:AuthManager;
    public async run(req:IRequest,res:IResponse,next:NextFn){
        try{
            
            let user = await this.authManager.getUser(req.query.id)

            req.user=user;
            
        }catch(e){
            this.sendUnauthorized();
        }
    }
}
function onSendHook(data,req,res,next) {
    let newData= data.replace('some-text', 'some-new-text')
    next(null,newData)
}


@controller()
export class LoginController extends Controller{

    @post("/login/")
    @hook(Hooks.OnRequest,SomeMiddleware)
    @hook(Hooks.OnSend,onSendHook)
    public  loginUser(req:IRequest,res:IResponse){
        return  this.authManager.login(req.user.username)
    }
}
```


## Hooks
### OnRequest
Called on incoming request

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.OnRequest,function(req,res,next) {
        //do something
        next()
     })
}
```
### PreMiddleware
Called pre route middleware and after app middleware

in file config/middlewares/all.ts
```typescript
import {Hooks} from '@appolo/route';

export = function (app: App) {
     app.addHook(Hooks.PreMiddleware,function(req,res,next) {
        //do something
        next()
     })
 }  
```

### PreHandler
Called before controller action

in file config/middlewares/all.ts
```typescript
import {Hooks} from '@appolo/route';

export = function (app: App) {
     app.addHook(Hooks.PreHandler,function(req,res,next) {
        //do something
        next()
     })
}
```

### OnSend
Called before response returned you can change the payload

in file config/middlewares/all.ts
```typescript
import {Hooks} from '@appolo/route';

export = function (app: App) {
     app.addHook(Hooks.OnSend,function(data,req,res,next) {
        let newData= data.replace('some-text', 'some-new-text')
        next(null,newData)
     })
}
```

### OnResponse
Called after response sent

in file config/middlewares/all.ts
```typescript
import {Hooks} from '@appolo/route';

export = function (app: App) {
     app.addHook(Hooks.OnResponse,function(req,res,next) {
        next()
     })
}
```

### OnError
Called on error and before all app errors

in file config/middlewares/all.ts
```typescript
import {Hooks} from '@appolo/route';

export = function (app: App) {
     app.addHook(Hooks.OnError,function(err,req,res,next) {
        next(err)
     })
}
```

