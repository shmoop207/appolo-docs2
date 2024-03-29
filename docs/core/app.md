---
id: app
title: App
sidebar_label: App
---

appolo `app` contains all the application context.
it can be injected to any class and exists on every request

The app can be injected to any class.
```typescript
@define()
export class FooManager{
    @inject() app:App
}
```
or accessed from  `req` `controller` or `middleware`
```typescript
@define()
export class FooManager{
   @controller()
   export class LoginController extends Controller{
       @post("/login/")
       public async loginUser(req:IRequest,res:IResponse){
           //req.app.options
       }
   }
}
```

## Usage
### options
#### `app.options:IOptions`
getter returns the launch options.
```typescript
app.options.port // 8080
```
### set
#### `app.set(name: keyof IOptions, value: any)`
set any app option.
app.set("port",8080) // 8080

### env
#### `app.env: IEnv`
getter return the current env
```typescript
app.env.name // production
```
### tree
#### [`app.tree`](/docs/core/tree)
return methods to traverse app child modules.

### module
#### [`app.module`](/docs/core/modules)
return methods to handle loading of modules.

### discovery
#### [`app.discovery`](/docs/core/discovery)
return methods to handles exported modules files and custom decorators.

### dispatcher
#### [`app.Dispatcher`](/docs/utils/event-dispatcher)
return global event dispatcher.


### injector
#### `app.injector :Injector`
return app injector instance
```typescript
app.injector.get("someObject")
```
### launch
#### `app.launch():Promise<App>`
launch the app and return the app instance when finished

```typescript
var {createApp}  from '@appolo/core';
(function async (){
  let app = await createApp().launch();
})()
```

### reset
#### `app.reset():Promise<void>`
reset the app clean all assets and closes the server
### server
#### `server(): http.Server | https.Server`
return the http server instance 





