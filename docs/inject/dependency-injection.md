---
id: dependency-injection
title: Dependency Injection
sidebar_label: Dependency Injection
---

Appolo has a powerful [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) system based on [`@appolo/inject`](https://github.com/shmoop207/appolo-inject).

It enables you to write organised, testable code based on the [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling) pattern.

You can always access the injector via `app.injector` or inject it `@inject() injector`.

## Usage
```typescript
import {define,singleton,init,inject,IFactory,factory} from '@appolo/inject';

@define()
@singleton()
export class DataRemoteManager {
    getData(){ ...}
}
```

```typescript
@define()
@singleton()
@factory()
export class DataManager implement IFactory<IDataManager> {
    @inject() dataRemoteManager:DataRemoteManager

    get(){
        return this.dataRemoteManager;
    }
}

```

```typescript
@controller()
export class FooController{
    @inject() dataManager:IDataManager
    constructor() {
        this.data = null
    }

    @init()
    initialize(){
        this.data =  this.dataManager.getData();
    }

    @get("/data")
    getData(){
        return this.data;
    }
}
```

## Constructor Injection
Using constructor injection or method parameter injection
```typescript
import {define,singleton,inject,init} from '@appolo/inject';
@define()
@singleton()
export class DataManager {
    getData(){ ... }
}

@define()
class FooController{
    constructor(@inject() dataManager:DataManager) {
        this.dataManager = dataManager;
    }

    @init()
    public initialize(){
        this.data =  this.dataManager.getData();
    }

    public test(@injectParam() logger:Logger){... }
}
```
:::info
It is not recommended to inject objects to constructor because it can lead to circular reference.
:::

## Property Injection
Using property injection it is possible to inject circular references
```typescript
import {define,singleton,inject,init,inject} from '@appolo/inject';
@define()
@singleton()
export class DataManager {
    getData(){ ... }
}

@define()
class FooController{
   
    @inject() dataManagerDataManager;

    @init()
    public initialize(){
        this.data =  this.dataManager.getData();
    }
}
```

## Inherited injections
Inherited injections supported as well.

Anything you inject on a base class will be available to child classes.


```typescript
import {define,init,inject} from '@appolo/inject';

export class BaseManager {
    @inject() protected env:any
    private getData(){...}
}

@define()
class FooManager extends BaseManager{
    @init()
    public initialize(){
        //the env object in injected from the base class
        console.log(this.env.test)
    }
}
```
> Remember not to use `@define` on the parent class.

## Override
you can to register 2 classes with the same id but sometimes it's need to override the registered class for example in testing env
```typescript

@define()
@singleton()
export class DbProvider {
   
    private getData(){...}
}

// in testing env

@define()
@singleton()
@override()
export class DbProvider {
   
    private getData(){ //return mock data}
}

```
