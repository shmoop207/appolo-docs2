---
id: middlewares
title: Middlewares
sidebar_label: Middlewares
---

You can configure express middleware or add custom middleware by adding configuration files to the middlewares folder.
The middlewares configuration file is called after the environment files were loaded.

in file config/middlewares/all.ts
```typescript
import favicon = require('static-favicon');
import bodyParser = require("body-parser");
import {IRequest,IResponse,NextFn}  from '@appolo/route';
import {App}  from '@appolo/core';

export = function (app: App) {
    app.use(bodyParser.json());
    app.use(function (req:IRequest, res: IResponse, next: NextFn) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(favicon());
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
