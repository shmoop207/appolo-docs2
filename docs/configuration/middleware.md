---
id: middlewares
title: Middlewares
sidebar_label: Middlewares
---

You can configure express middleware or add custom middleware by adding configuration files to the middlewares folder.

## Global Middlewares
The middlewares configuration file is called after the environment files loaded.

The middlewares will be used on all requests.
```typescript title="config/middlewares/all.ts"
import bodyParser = require("body-parser");
import {IRequest,IResponse,NextFn}  from '@appolo/route';
import {App}  from '@appolo/core';

export = function (app: App) {
    app.route.use(bodyParser.json());
    app.route.use(function (req:IRequest, res: IResponse, next: NextFn) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
}
```
This middleware will be added only when the env is `production`
```typescript title="config/middlewares/production.ts"
import favicon = require('static-favicon');
import {App}  from '@appolo/core';

export = function (app: App) {
     app.route.use(favicon());
}
```

## Async middlewares
Async middlewares also supported. 

if error is thrown `next(new HttpError(e))` is called
```typescript
import {IRequest,IResponse,NextFn}  from '@appolo/route';
import {App}  from '@appolo/core';

export = function (app: App) {
    app.route.use(async function (req:IRequest, res: IResponse, next: NextFn) {
        
      await someAsyncFnction();
     
      res.setHeader("Some-Header", "value");

    });
}
```
