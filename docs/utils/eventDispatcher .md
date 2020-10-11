---
id: event-dispatcher
title: Event Dispatcher
sidebar_label: Event Dispatcher
---

Event dispatcher enabled classes to listen to and fire events.

you can inherit from EventDispatcher or use as instance.

Global Event Dispatcher instance in available on `app` context or can be injected.

## Usage
### Inherit
```typescript
import {define,singleton,init,inject} from '@appolo/inject';
import {EventDispatcher} from '@appolo/events';

@define()
@singleton()
export class FooManager extends EventDispatcher{
    public notifyUsers(){
        this.fireEvent('someEventName',{someData:'someData'})
    }
}
@define()
export class FooController {
    @inject() fooManager:FooManager;
    
@init()
    public async initialize(){
        this.fooManager.on('someEventName',(data)=>{
            this.doSomething(data.someData)
        },this);

        //or with promise
        let data = await  this.fooManager.once('someEventName')
    }
    doSomething(data){...}
}
```

### Instance
```typescript
import {define,singleton,init,inject} from '@appolo/inject';
import {Event} from '@appolo/events';

@define()
@singleton()
export class FooManager {
    public notifyEvent:Event<{someData:string}> = new Event()
    
public notifyUsers(){
        this.notifyEvent.fireEvent({someData:'someData'})
    }
}
@define()
export class FooController {
    @inject() fooManager:FooManager;
    
@init()
    public async initialize(){
        this.fooManager.notifyEvent.on('someEventName',(data)=>{
            this.doSomething(data.someData)
        },this);

        //or with promise
        let data = await  this.fooManager.notifyEvent.once('someEventName')
    }
    doSomething(data){...}
}
```
### Global Dispatcher
```typescript
import {define,singleton,init,inject} from '@appolo/inject';
import {EventDispatcher} from '@appolo/events';

@define()
@singleton()
export class FooManager {
    @inject() dispatcher:EventDispatcher

    public notifyUsers(){
        this.dispatcher.fireEvent('someEventName',{someData:'someData'})
    }
}
@define()
export class FooController {
    @inject() dispatcher:EventDispatcher

    @init()
    public async initialize(){
        this.dispatcher.on('someEventName',(data)=>{
            this.doSomething(data.someData)
        },this);

        //or with promise
        let data = await  this.dispatcher.once('someEventName')
    }
    doSomething(data){...}
}
```
## API

### on
#### `on(event,callback,[scope],[options])`
add an event listener
- event - event name routing key also supported.
- callback - callback function that will triggered on event name.
- scope - optional, the scope of the callback function default: this.
- options
    * once?: boolean - remove the handler after the first call.
    * await?: boolean - await the handler promise default false
    * parallel?: boolean -  await the handler in parallel default true
    * timeout?: number - one timeout in await mode.
    * order?: number - handler order in callbacks lower will execute first

```typescript
this.dispatcher.on("someName",this.someFn,this)
this.dispatcher.on("someName",this.someFn,this,{once:true})
this.dispatcher.on("someName",this.someFn,this,{order:1})

//with routing key
this.dispatcher.on("#",this.someFn,this,)
this.dispatcher.on("aaa.#.bbb.*",this.someFn,this,)

````

### once
#### `once(event,[callback],[scope],[options])`
add an event listener will be called only once if no callback passed a promise will be returned
- event - event name.
- callback - callback function that will triggered on event name.
- scope - optional, the scope of the callback function default: this.
- options - same as `on`
```typescript
this.dispatcher.once("someEvent",this.someFn,this)
//with promise
let result = await this.dispatcher.once("someEvent")
//with promise time out
let result = await this.dispatcher.once("someEvent",null,null,{timeout:10})
````
### un
#### `un(event,callback,[scope])`
remove an event listener. All the arguments must be === to the onces used in the on method, or else it won`t be removed.
- event - event name.
- callback - callback function.
- scope - optional, the scope of the callback function.
```typescript
this.dispatcher.un("someEvent",this.someFn,this)
````

### fireEvent
#### `fireEvent(event,[arguments])`
fireEvent - triggers the callback functions of a given event name
- eventName - name of the event
- arguments - all other arguments will be passed to the callback function
```typescript
this.dispatcher.fireEvent("someEvent",{"some":"value"})
````

### fireEventAsync
#### `fireEventAsync(event,[arguments])`
fireEvent - triggers the callback functions of a given event name and wait for handlers callback promise to resolve.
- eventName - name of the event
- arguments - all other arguments will be passed to the callback function
```typescript
this.dispatcher.on("someName",async (param)=>{
    param // "some":"value"}
    //do something async
},this,{await:true})

await this.dispatcher.fireEventAsync("someEvent",{"some":"value"})
````

### removeAllListeners
#### `removeAllListeners()`
removes all event listeners
### removeListenersByScope
#### `removeListenersByScope(scope)`
removes all event listeners by given scope
### hasListener
#### `hasListener(event,callback,[scope]):boolean`
return true if listener exists
### bubble
#### `bubble(event: string, scope: IEventDispatcher)`
fire event given event on given scope 
### listenerCount
#### `(event: string): number`
return number of listener for given event

### iterator
#### `iterator<T>(event: string | string[], options?: { limit?: number }): AsyncIterableIterator<T>`
return AsyncIterableIterator for given event
```typescript
    const emitter = new EventDispatcher();
    const iterator = emitter.iterator("test", {limit: 3});
   
    emitter.fireEvent('test', 1);
    emitter.fireEvent('test', 2);
    emitter.fireEvent('test', 3);

    let results = [];

    for await (const value of iterator) {
        results.push(value)
    }
```
