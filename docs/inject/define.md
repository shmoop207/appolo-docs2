---
id: define
title: "Define"
sidebar_label: "Define"
---
Use define decorator to register the class in the injector.

When you decorate a class with @define(), the class's name is transformed into a camel-case, and this will be the name you use to inject it.

The class must be exported.

```typescript
@define()
export class FooController{ }
```
or with custom Id
```typescript
@define("someId")
export class FooController2{ }
```

get the controller instance from the injector

```typescript
let fooController = injector.get('fooController');
let fooController2 = injector.get(FooController);
let someController = injector.get('someId');
```
