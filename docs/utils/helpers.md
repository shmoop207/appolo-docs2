---
id: helpers
title: Helpers
sidebar_label: Helpers
---

Some useful decorators you can use on any method

## Before
run before class method before any method
```typescript
import {define,inject,before} from '@appolo/helpers';
@define()
export class SomeBefore  {
    public async run(data){
        data.count = 3
    }
}
```

now you can add before the decorator on any method
```typescript
@define()
export class SomeManager{

    //the SomeBefore class will run before someAction with same arguments
    @before<SomeBefore>(SomeBefore,(c=>c.run))
    public async someAction(data){
        return data.count + 1
    }
}
```

## After
run after class method before any method
```typescript
import {define,inject,before} from '@appolo/helpers';
@define()
export class SomeAfter  {
    public async run(counter){
        return counter +1
    }
}
```

now you can add after the decorator on any method
```typescript
@define()
export class SomeManager{

    //the SomeAfter class will run after someAction with someAction return argument
    @before<SomeAfter>(SomeAfter,(c=>c.run))
    public async someAction(){
        return  1
    }
}
```


## Delay
delay call method by given time in milliseconds
```typescript
import { delay } from '@appolo/helpers';

class SomeClass {
    @delay(1000)
    method() {
    // ...
    }
}
```
## Bind
bind method to class instance
```typescript
import { bind } from '@appolo/helpers';

class SomeClass {
    @bind
    method() {
    // ...
    }
}

document.body.addEventListener('click', new SomeClass().method);
```
## Debounce
debounce method using lodash debounce
```typescript
import { debounce } from '@appolo/helpers';

class SomeClass {
    @debounce(1000,{trailing:true})
    method() {
    // ...
    }
}
```
## Throttle
throttle method using lodash debounce
```typescript
import { throttle } from '@appolo/helpers';

class SomeClass {
    @throttle(1000,{trailing:true})
    method() {
    // ...
    }
}
```
## Memoize
memoize method using lodash debounce
```typescript
import { memoize } from '@appolo/helpers';

class SomeClass {
    @memoize()
    method() {
    // ...
    }
}
```
## Once
method will be called max n times and return last call result
```typescript
import { once } from '@appolo/helpers';

class SomeClass {
    @once(2)
    method() {
    // ...
    }
}
```
## Interval
setInterval to method once called
```typescript
import { interval } from '@appolo/helpers';

class SomeClass {
    @interval(100)
    method() {
    // ...
    }
}
//start the interval
new SomeClass().method()
```

