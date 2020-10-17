---
id: singleton
title: Singleton
sidebar_label: "Singleton"
---
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Class%20Decorator-blue?style=for-the-badge" />

The class instance will be created only once and injector will return the same instance every time.
```typescript
@define()
@singleton()
export class FooController{}

let fooController = injector.get<FooController>(FooController);
let fooController2 = injector.get<FooController>('fooController');

console.log(fooController === fooController2) // true

```
