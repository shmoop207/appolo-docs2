---
id: state
title: State
sidebar_label: State
---
State Management between servers using [appolo-state](https://github.com/shmoop207/appolo-state-cluster) and  [redis](https://github.com/luin/ioredis)
## Installation

```npm
npm i @appolo/state
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `stateProvider` injection id | `string`|  `stateProvider`|
| `maxStates` | max state history | `number` | `1` |
| `cache` | save state cache on the server    | `boolean` | `true` |
| `cacheTime` | max cache time for valid state   | `number` | `60 * 1000` |
| `redis` | redis connection string   | `string` | `` |

in config/modules/all.ts

```typescript
import {StateModule} from '@appolo/state';

export = async function (app: App) {
    app.module.use(StateModule.for({redis:"redis://"}));
}
```

## Usage
State class must inherit from `Store`. 
The store instance will be singleton.

```typescript
import { state,Store } from '@appolo/state';

@state("test")
export class TestStore extends Store<{ counter:number }> {
    protected _initialState = {counter:0}
    
    async incCounter(value:number) {
    
        let state = await this.lock();  // get state and lock
        
        await this.setState({counter: state.counter +value}); // set new state
    }
}
```
now we can inject store and change the state.
The state will be changed on all servers connected to the store by name.
```typescript
import { define,inject,init } from '@appolo/inject';

@define()
export class SomeClass  {
    @inject() testStore:TestStore
    
    @init()
    init(){
        //will trigger when only counter is changed;
        this.testStore.on("counter",({state:TestStore,value:number})=>{});
        //will trigger when state is changed;
        this.testStore.on("stateChanged",({state:TestStore})=>{});
    }

    
    async incCounter(num: number) {
      await this.testStore.incCounter(num);
    }
}

```

## Api
### getState
#### getState(): Promise<T/>
return the current state

### statesCount
#### get statesCount(): Promise<number/>
return total number of states

### states
#### states(): AsyncIterableIterator<T/>
return states iterator
```typescript
for await (let state of store.states()) {
    count += state.counter;
}
```

### stateAt
#### stateAt(index: number): Promise<T/>
return state at index


### setState
#### setState(value: Partial<T/> | T, options?: SetStateOptions)
set new  state


### increment
#### increment(path: string, inc: number): Promise<void/>
increment counter by path
```typescript
await state.increment("counter",1);
```

### lock
#### lock(timeMilli = 5000, retryMilli = 5): Promise<T/>
get state and lock for given time is  state is locked it will retry with retryMilli.

### prevState
#### get prevState(): Promise<T/>
return the previous state

### goToPrevState
#### get goToPrevState(): Promise<T/>
set the previous state as the current state


### nextState
#### get nextState(): Promise<T/>
return the next state

### goToNextState
#### get goToNextState(): Promise<T/>
set the next state as the current state

### goToState
#### get goToState(index: number): Promise<T/>
set current state by previous state index

### reset
#### reset(state?: T)
reset the state to init state or given state

### quit
#### quit()
disconnect form redis and stop listen to events
