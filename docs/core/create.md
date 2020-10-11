---
id: create-app
title: Create App
sidebar_label: Create
---

create an app using `createApp` method.
when you call `launch` the app will start the bootstrap process. 
```typescript
let {createApp}  from '@appolo/core';
(function async (){
  let app = await createApp().launch();
})();
```

or with static method
```typescript
let  {App}  from '@appolo/core';

(function async (){

  let app = await App.create().launch();

})();
```

you can change the default [options](/docs/configuration/options)
```typescript
let  {App}  from '@appolo/core';

(function async (){
  
    let app = await App.create({
        port:8888,environment:'testing'
    }).launch();

})();
```

if you want to add middlwares or hooks or listing to events you need to added them before launch
```typescript
let  {App}  from '@appolo/core';

(function async (){
  
    let app =  App.create()
    app.route.use((res,res,next)=>next())
    app.module.use(LoggerMoudle)
    app.route.hooks.onRequest((res,res,next)=>next())
    await app.launch();

})()
```
