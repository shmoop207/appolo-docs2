---
id: thread
title: Thread
sidebar_label: Thread
---
Thread Pool using [appolo-thread](https://github.com/shmoop207/appolo-thread) and node [worker_threads](https://nodejs.org/api/worker_threads.html)
## Installation

```npm
npm i @appolo/thread
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `poolProvider` injection id | `string`|  `poolProvider`|
| `threads` | number of threads per pool | `number` | `1` |
| `maxThreadJobs` | max running jobs pre thread    | `number` | `infinate` |

in config/modules/all.ts

```typescript
import {ThreadModule} from '@appolo/thread';

export = async function (app: App) {
    app.module.use(ThreadModule);
}
```

## Usage
### Run
First we create  worker thread.
worker class must inherit from `Worker`.

```typescript
import { Worker,worker } from '@appolo/thread';

@worker()
export class Fibonacci extends Worker {
    async run(num: number) {
        let a = 1, b = 0, temp;

        while (num >= 0) {
            temp = a;
            a = a + b;
            b = temp;
            num--;
        }

        return b;
    }
}
```
now we can inject poolProvider and run our worker
```typescript
import { define,inject } from '@appolo/inject';
import { PoolProvider } from '@appolo/thread';

@define()
export class SomeClass  {
    @inject() poolProvider:PoolProvider
    
    async calcFibonacci(num: number) {
       let result = await this.poolProvider.run(Fibonacci,num);

        return result;
    }
}

```


### Message event
The `message` event  emitted from the worker using the worker `postMessage` method

```javascript

pool.on("message",function(data) {
   console.log(data) // some message
})

```
post message in worker class
```typescript
import { Worker,worker } from '@appolo/thread';
@worker()
export class Fibonacci extends Worker {
    
    async initialize(){
       this.postMessage("some message")
    }
    
    async run(num: number) {
        //...
    }
}

```
### Uncaught event
The `error` event emitted if the worker thread throws an uncaught exception.
```javascript

pool.on("error",function(e) {
   console.log(e) 
})
````


## License
MIT
