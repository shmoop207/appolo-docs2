---
id: modules
title: Modules
sidebar_label: Modules
---

- modules can be also nested appolo apps with own `injector` and app `context` they function as independent appolo app.
- module can also export  instances that will be injected to main app injector.
- modules can load own nested modules.
- each module instance is uniq you can load the same module multiple time with different options.
- modules can be loaded in sequence or in parallel mode.

<br />

![modules](/img/modules.svg)


## Module Directory Structure
```bash
|- config
    |- env
        |- all.ts
        |- production.ts
	|- modules
	    |- all.ts
|- src
    |- controllers
    |- managers
    |- services
    |- bootstrap.ts
| someModule.ts
```
>module env will be merged with module parent env.

## Usage
each module must inherit from `Module`


```typescript title="monitorModule.ts"
import {Module, module} from '@appolo/engine';
import {MonitorController} from "./src/monitorController";

@module({
    exports: [MonitorController]
})
export class MonitorModule extends Module {

}
```

```typescript title="src/monitorController.ts"
import {Controller, controller, get, inject} from 'appolo';
import {IEnv} from "./config/env/IEnv";

@controller("/api/monitor")
export class MonitorController extends Controller {

    @inject() env: IEnv;

    @get()
    public monitor() {
        return {ok: true, type: this.env.name}
    }
}

```
now load  module in main app modules
```typescript title="config/moduels/all.ts"
export = async function (env, app: App) {
    app.module.use(MonitorModule)
}
```

now load  modules in parallel
```typescript title="config/moduels/all.ts"
export = async function (env, app: App) {
    app.module
    .use(MonitorModule) //will we loaded first
    .use(ModuleA,ModuleB) // will we loaded in paralel
    .use(ModuleC) // will we loaded last
}
```



now monitoring controller is part of our app  the route `/api/monitor` in available

## Module Config
module options can be injected in any module class
```typescript type="monitorModule.ts"
@module({
    exports: [MonitorController]
})
export class MonitorModule extends Module {
    public static for(config:{name:string}){
        return {type: MonitorModule, config}
    }
}
```
```typescript type="src/monitorController.ts"
@controller("/api/monitor")
export class MonitorController extends Controller {

    @inject() moduleOptions: { name: string };

    @get()
    public monitor() {
        return {ok: true, name: this.moduleOptions.id}
    }
}
```
```typescript title="config/moduels/all.ts"
export = async function (env, app: App) {
    await app.module.use(MonitorModule.for({name:"someId"}))
}
```

## Module Load
some time you need to load a module before the main app is loaded for example the logger module
```typescript title="moduleLogger.ts"
@module({
    exports: [Logger]
    immediate:true
})
export class LoggerModule extends Module {
    
}
```

```typescript title="config/modules/all.ts"
export = async function (env, app: App,injector:Injector) {
    await app.module.load(LoggerModule)
    //now the logger app is loaded and can be used everyware.

    injector.get("logger").info("logger loaded")
}
```

## Async Modules
module can use all `appolo` features like async factories.<br/>
the app will be launched when all modules finished loading

```typescript title="dbModule.ts"
import {Module, module} from '@appolo/engine';

@module()
export class DbModule extends Module<{ id: string }> {

    public static for(config:{id:string}){
        return {type: DbModule, config}
    }    

    protected readonly Defaults = {
        id:"db"
    };

    public get exports() {
        return [{id: this.moduleOptions.id, type: DbFactory}]
    }
}
```
```typescript title="src/dbFactory.ts"
import {define, singleton,factory,IFactory} from '@appolo/inject';

import mongoose = require('mongoose');

@define()
@singleton()
@factory()
export class DbFactory implements IFactory<mongoose.Connection> {

    @inject() moduleOptions: {conn:string};

    async get(): Promise<mongoose.Connection> {

       const connection = await mongoose.createConnection(this.moduleOptions.conn);
       return connection
    }
}

```
we load the module in the main app and define the id of db client.

```typescript title="config/module/all.ts"
export = async function (env, app: App) {
     app.module.use(DbModule.for({id:"db1",conn:"mongo://someurl1"}))
        .use(DbModule.for({id:"db12",conn:"mongo://someurl2"}))
}
```
now you can inject the db instance anywhere in the main app
```typescript
@define()
export class SomeManager{
    @inject() db1:mongoose.Connection

    @init()
    async initialize(){
        await this.db1.collections()
    }
}

```

## Module Lifecycle
- `beforeAppInitialize` - called on App initialize
- `beforeModuleInitialize` - called before module initialize
- `beforeModuleLaunch` - called before module launch
- `onInjectInitialize` - called on module init method
- `onInjectBootstrap` - called on module bootstrap method
- `afterModuleInitialize` - called after module initialized and inject finish loading
- `afterModuleLaunch` - called after module launched finish the bootstrap process
- `afterAppInitialize` - called after app initialized and inject finish loading
- `afterAppLaunch` - called after app launch finish the bootstrap process
- `beforeReset` - called before app reset
- `reset` - called before app reset

```typescript
@module()
export class DbModule extends Module<{ id: string }> {

    public get exports() {
        return [{id: this.moduleOptions.id, type: DbFactory}]
    }

    beforeModuleInitialize(){
        //do something
    }
}

```

## Dependency injection

The module instance can be used with inject only after the `onInjectInitialize` event

```typescript
@module()
export class DbModule extends Module<{ id: string }> {

    @inejct() dbClient :Cleint

    async onInjectInitialize(){
       await this.dbClient.connect()
    }
}

```

Inner modules can inject instances from parent App or modules loaded on the parent App.
```typescript
@define()
@singleton()
@factory()
export class DbFactory {
    @inject() logger: ILogger;
}
```
it will look the logger instance first in the module injector if not found it will look in the module parent injector util it will reach the root injector if the instance not found error will be thrown



## Module Properties
moduleOptions -  return module options

- `parent` -  return  module parent app
- `app` - return module app
- `rootParent` - return top root app
- `moduleOptions` - return custom module config
- `defaults` - return default custom module config


## Module Function
Third party modules can be easily loaded into appolo inject and used in inject container.<br/>
Each module must call `app.module.loadFn` before it can be used by appolo launcher.<br/>
`app.module.loadFn` accepts a function as an argument.<br/>
The last argument to that function must be the `next` function, modules  loaded serially, so each module must call the next function or return a promise in order to continue the launch process.
Other arguments to the function are object which you wish to inject into the module (these objects must be injected earlier).

By default, each module can inject:
- env - environment object
- inject - injector - to add objects to the injector
- app - the app instance
- or any previous loaded module instances

In config/modules/all.ts
```typescript
import {App,IEnv} from '@appolo/core';
import {Injector} from '@appolo/injector';
export = async function(app:App){
    await app.module.loadFn(async function(env:IEnv,inject:Injector,app:App){
        let myModuleObject = {data:'test'};
        await toSomeThing();
        inject.addObject('myModuleObject',myModuleObject);
    });
}
```
Now we can inject myModuleObject to any class
```typescript
import {define,singleton,initMethod,inject} from '@appolo/inject';
@define()
export  class AuthMiddleware{
    @inject('myModuleObject') testObject:any
    public doSomeThing() {
        return this.testObject.data; //return 'test'
    }
}
```

module can loaded in parallel
```typescript
import {App} from '@appolo/core';
export = async function(app:App){
    await app.module.loadFn(SomeModule,SomeModule2);
}
```

A logger module example with [winston](https://github.com/flatiron/winston)<br/>
In config/modules/all.ts
```typescript
import winston = require('winston');
import {App} from '@appolo/core';
import {Injector} from '@appolo/inject';
export = async function(app:App){
    await appolo.module(async function(env:any,inject:Injector){
        transports = [];
        transports.push(new (winston.transports.Console)({
            json: false,
            timestamp: true
        })

        let logger = new (winston.Logger)({  transports: transports});
        inject.addObject('logger', logger);
    });
```
Now we you inject logger anywhere we need it
```typescript
import {define,inject} from '@appolo/core';
@define()
export class DataManager{
    @inject() logger:Logger
    public initialize(){
        this.logger.info("dataManager initialized",{someData:'someData'})
    }
}
```

