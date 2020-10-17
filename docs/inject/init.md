---
id: init
title: Initialization
sidebar_label: Initialization
---
## Init
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Method%20Decorator-red?style=for-the-badge" />

The `init` method will be called after all instances created and all the properties injected.
```typescript
import {define,singleton,inject,init} from '@appolo/inject';

@define()
@singleton()
class FooManager{
    get name(){return 'foo'; }
}
@define()
export class FooController{
    @inject() fooManager:FooManager

    @init()
    initialize(){
        this.name = this.fooManager.name
    }
    get name () {return this.name}
}

let fooController = injector.get(FooController);
fooController.name // foo
```
> You don't have a guarantee which initMethod will be called first.<br/>
 If the init method return promise the injector will **not** wait for the result.
 if you need ordered class init you can use the [`Bootstrap`](engine/bootstrap.md) class

```typescript
import {define,singleton,inject,bootstrap,IBootstrap} from 'appolo';

@define()
@bootstrap()
export class Bootstrap implements IBootstrap{
    @inject() someManager1:SomeManager1
    @inject() someManager2:SomeManager2

    public async run(){
        await this.someManager1.init();
        await this.someManager2.init();
    }
}
 ```

## InitAsync
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Method%20Decorator-red?style=for-the-badge" />

same as init but if a promise returned it will be awaited before the initialize process continued.<br/>
all `initAsync` methods will run in parallel.   
```typescript
import {define,singleton,inject,init,initAsync} from '@appolo/inject';

@define()
@singleton()
class FooManager{
    async getName(){return 'foo'; }
}
@define()
export class FooController{
    @inject() fooManager:FooManager

    @initAsync()
    async initialize(){
        // 
        this.name = await this.fooManager.getName()
    }
    get name () {return this.name}
}
```
## Bootstrap
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Method%20Decorator-red?style=for-the-badge" />

The `bootstrap` method will be called after all init and initAsync methods called.
```typescript
import {define,singleton,inject,init,bootstrap} from '@appolo/inject';

@define()
@singleton()
class FooManager{
    
    public name:string
    
    @init()
    private init(){
        this.name = "foo"
    }

}
@define()
export class FooController{
    @inject() fooManager:FooManager

    @bootstrap()
    bootstrap(){
        this.name = this.fooManager.name
    }
    get name () {return this.name}
}

let fooController = injector.get(FooController);
fooController.name // foo
```

## BootstrapAsync
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Method%20Decorator-red?style=for-the-badge" />

same as `bootstrap` if a promise returned it will be awaited before the initialize process continued.<br/>
all `bootstrapAsync` methods will run in parallel.   
```typescript
import {define,singleton,inject,init,bootstrapAsync} from '@appolo/inject';

@define()
@singleton()
class FooManager{
    
    public name:string
    
    @init()
    private init(){
        this.name = "foo"
    }
    public async getName(){
        return this.name;
    }



}
@define()
export class FooController{
    @inject() fooManager:FooManager

    @bootstrapAsync()
    async bootstrap(){
        this.name = await this.fooManager.getName()
    }
    get name () {return this.name}
}

```

