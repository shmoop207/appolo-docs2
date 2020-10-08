---
id: app
title: App
sidebar_label: App
---

appolo `app` contains all the application context.
it can be injected to any class and exists on every request


create an app using `createApp` method.
when you call `launch` the app will start the bootstrap process. 
```typescript
var {createApp}  from '@appolo/core';
(function async (){
  let app = await createApp().launch();
})()
```

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
return  methods to traverse app child modules.

### modules
#### [`app.module`](/docs/core/modules)
return  methods to handle loading of modules.

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

### module
#### `app.module(module:Module):Promise<void>`
register custom module

```typescript
await app.module(async function(env:any,inject:appolo.Injector){
    let myModuleObject = {data:'test'};
    await toSomeThing();
    inject.addObject('myModuleObject',myModuleObject);
});
```



