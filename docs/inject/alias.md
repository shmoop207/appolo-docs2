---
id: alias
title: Alias
sidebar_label: "Alias"
---

You can add alias names to classes and get all the classes instances by alias name as an array or dictionary.

You can multi alias names to a single class.

## Alias Singleton
All the alias classes must be `singleton`.

```typescript
interface IHandler{
    name:string
}

@define()
@singleton()
@alias('IHandler')
class FooManager implements IHandler {
    get name(){return 'foo'}
}
@define()
@singleton()
@alias('IHandler')
class BarManager implements IHandler{
    get name(){return 'bar'}
}

@define()
class BuzzController{
    @alias('IHandler') allHandlers:IHandler[]

    get name(){
        return this.allHandlers.map(obj =>obj.name).join();
    }
}

let buzzController = injector.get(BuzzController);
buzzController.name // foobar
```
inject alias by dictionary
```typescript

@define()
@singleton()
@alias('IHandler')
class FooManager implements IHandler {
    get name(){return 'foo'}
}
@define()
@singleton()
@alias('IHandler')
class BarManager implements IHandler{
    get name(){return 'bar'}
}

@define()
class BuzzController{
    @alias('IHandler','name') allHandlers:{[index:string]:IHandler}

    get name(){
        return this.allHandlers["bar"].name
    }
}

let buzzController = injector.get(BuzzController);
buzzController.name // bar
```

## Alias Factory
You can add alias factory names to classes and get all the classes new instance by factory method.

```typescript
interface IHandler{
    name:string
}

@define()
@aliasFactory('IHandler')
class FooManager implements IHandler{
    constructor (private _name:string) {  }
    get name():string{ return this._name }
}
@define()
@aliasFactory('IHandler')
class BarManager implements IHandler{
    public name:string
    constructor (private _name:string) {  }
    get name():string{ return this._name }
}

@define()
class BuzzController{
    @aliasFactory('IHandler') allHandlers:((name:string)=>IHandler)[]

    get name(){
        return this.allHandlers.map((createHandler,index) =>createHandler(index).name).join();
    }

let buzzController = injector.get(BuzzController);
buzzController.name // 01
```
