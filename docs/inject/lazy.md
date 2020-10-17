---
id: lazy
title: Lazy
sidebar_label: Lazy
---
## Lazy Class
lazy class will be created only when injected for the first time
```typescript
@define()
@singleton()
@lazy()
class BarManager{
    get name(){return 'bar'; }
}

@define()
class BuzzController{
    @inject() barManager:BarManager
    get name () {return this.foo.name}
 }
let buzzController = injector.get(BuzzController);
console.log(buzzController.name) // bar

```

## Lazy Inject
lazy inject will inject property method that will create inject class once called
```typescript
@define()
@singleton()
@lazy()
class BarManager{
    get name(){return 'bar'; }
}

@define()
class BuzzController{
    @lazy() barManager:BarManager
    get name () {return this.barManager.name}
 }
let buzzController = injector.get(BuzzController);
console.log(buzzController.name) //only now bar manager will created
```

## Lazy Custom Function
invoke custom lazy function, the value returned from will be injected 
```typescript

@define()
class Test2 {
  

}

let customDecorator = function () {   
    return customFn((inject: Injector) => {
        return inject.get<Test2>(Test2)
    })
};

@define()
class Test {
    @customDecorator()
    test: string

}

injector.get(Test).test; // test2 

```
