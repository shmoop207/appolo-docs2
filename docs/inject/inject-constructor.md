---
id: inject-constructor
title: "Inject constructor"
sidebar_label: "Inject Constructor"
---
you can inject objects to constructor arguments. 

The object instance can be injected by id or by value.
```typescript
@define()
@singleton()
export class FooManager{
    get name () {
        return 'foo'
    }
}
@define()
export class BuzzController{
	constructor (@inject() fooManager:FooManager,name:string) {
	    this.fooManager = fooManager;
	    this.name = name;
	}
	name () {
	    return   this.fooManager.name +this.name
	}
}

var buzzController = injector.getObject<BuzzController>(BuzzController,["buzz"]);
console.log(buzzController.name()) // foobuzz
```

> it is not recommended to inject objects to constructor because it can easily lead to  circular reference.

it is not possible to use injected object via `@inject` property in the constructor because it is not yet injected.

```typescript
@define()
@singleton()
export class FooManager{
    get name () {
        return 'foo'
    }
}
@define()
export class BuzzController{

    @inject fooManager:FooManager;

	constructor () {
	    this.name =  this.fooManager.name();
	    //throw Error this.fooManager is undefined
	}

}

let buzzController = injector.getObject<BuzzController>(BuzzController);
```

> use @init to solve this

```typescript
@define()
@singleton()
export class FooManager{
    get name () {
        return 'foo'
    }
}
@define()
export class BuzzController{

    @inject fooManager:FooManager;

	@init()
	init(){
        this.name =  this.fooManager.name();
	}
}

let buzzController = injector.getObject<BuzzController>(BuzzController);
```
