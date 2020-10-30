---
id: context
title: Context
sidebar_label: Context
---
Request context module for appolo build with [appolo-context](https://github.com/shmoop207/appolo-context) and `async_hooks`.

> new context will be created for every request

## Installation

```typescript
npm i @appolo/context
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | id of context injector  | `string`|  `context`|

in config/modules/all.ts

```typescript
import {ContextModule} from '@appolo/context';

export = async function (app: App) {
   app.module.user(ContextModule);
}
```

## Usage
first define your context using the `@context` decorator
```typescript
import {context} from '@appolo/context';
import {inject} from '@appolo/inject';

@context()
export class MyContext {

    @inject() env: any;

    constructor(req, res) {

    }

    private _user: string;

    public set user(value: string) {

        this._user = value
    }

    public get user(): string {
        return this._user
    }
}

```
For the example we will define a middleware to set the context data
```typescript
@define()
@singleton()
export class UserMiddleware extends Middleware {
    @inject() context: MyContext;

    async run(req, res, next) {
        this.context.user = req.query.userName;
        next()
    }
}

```
Now we can access the context from any class using `@inject context`
> note that the context is uniq for every request and cannot share data between requests

```typescript
@define()
@singleton()
export class SomeManager {

    @inject() context: MyContext ;

    public async getName():Promise<string>{
        return this.context.user;
    }
}

```

In the controller we will put the middleware and access the manager to get the context name
```typescript
@controller()
export class ContextController extends Controller {

    @inject() someManager: Manager;

    @get("/test/context/")
    @middleware(UserMiddleware)
    async test(req: IRequest, res: IResponse) {

        let userName = await this.someManager.getName()

        return {userName}
    }
}

```

You can also access the current context from `getContext` function

```typescript
import {getContext} from '@appolo/context';

@define()
@singleton()
export class SomeManager {

    public async getName():Promise<string>{
        return getContext().user;
    }
}

```
