---
id: modules
title: Modules
sidebar_label: Modules
---
App modules can be defined in `config/modules` same as the middlware config
The modules configuration file is called after the environment files loaded.
>Modules are loaded by order

```typescript title="config/modules/all.ts"

import {App}  from '@appolo/core';

export = async function (app: App,env:IEnv) {
    
    //load module instantly
    await app.modules.load(LoggerModule);
    
    //load module Fn
    await app.modules.loadFn(function(injector:Injector){
        injector.addObject("someId","value")
    }));  
    
    app.modules.use(SomeModule).use(SomeModule,{"some","value"})
    
    // load modules in parallel
    app.modules.use(SomeModule2,SomeModule3,{"some","value"})
}
```
## Async middlewares
Async middlwares also supported. 

if error is thrown `next(new HttpError(e))` is called
```typescript
import {IRequest,IResponse,NextFn}  from '@appolo/route';
import {App}  from '@appolo/core';

export = function (app: App) {
    app.use(async function (req:IRequest, res: IResponse, next: NextFn) {
        
      await someAsyncFnction();
     
      res.setHeader("Some-Header", "value");

    });
}
```
