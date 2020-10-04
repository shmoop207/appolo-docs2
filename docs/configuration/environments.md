---
id: environments
title: Environments
sidebar_label: Environments
---

With environments, you can define different configurations depending on the environment type your app is currently running.

It is recommended to have 4 types of environments: `development`, `testing`, `staging`, `production`.
After `app.launch` you can always access the current environment vars via `app.env`.

all.ts
```typescript
export = {
  name:'all',
  someVar:'someVar'
}
```
development.ts
```typescript
export = {
  name:'develpment',
  db:'mongo://development-url'
}
```
testing.ts
```typescript
export = {
  name:'testing',
  db:'mongo://testing-url'
}

```
If we launch our app.js with `NODE_ENV = testing`
```typescript
import {createApp}  from '@appolo/core';
...
let app = await createApp().launch();
var env = app.env;
console.log(env.name,env.someVar,env.db) // 'testing someVar monog://testing-url'
```

## Env Injection
the env object can be injected to any class.
```typescript
import {define,initMethod,inject} from '@appolo/inject';

@define()
export class BaseManager {
    @inject() env:IEnv

    private getData(){
        console.log(this.env.name)
    }
}

```
