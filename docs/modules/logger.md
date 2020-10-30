---
id: logger
title: Logger
sidebar_label: Logger
---
logger module for appolo build with [pino](https://github.com/pinojs/pino)

## Installation

```typescript
npm i @appolo/logger
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | logger id  | `string`|  `logger`|
| `level` | base log level  | `Log.Level`|  `info`|
| `transports` | optional ICustomTransport array | `array` | `null` |

in config/modules/all.ts


```typescript
import {LoggerModule} from '@appolo/logger';

export = async function (app: App) {
   await app.module.use(LoggerModule);
    // or with custom transport
    await app.module.load(LoggerModule.for({transports:[MyCustomTransport]}));
}
```

```typescript
export class MyCustomTransport {

    initialize(): Promise<void>{
    }

    log(level: Level, msg: string, args: PlainObject){
        console.log(level,msg,args)
    }
}
```

## Usage
now logger instance can be inject
```typescript
import {ILogger} from '@appolo/logger';

@define()
export class SomeManager{
    @inject() logger:Ilogger

    someMethod(){
        try{
            this.logger.info("log something")
        }catch(e){
            this.logger.error("some error",{e,someParam:"aa"})
        }
    }
}

```
static logger
```typescript
import {Logger} from '@appolo/logger';

@define()
export class SomeManager{

    someMethod(){
        try{
            Logger.logger.info("log something")
        }catch(e){
            Logger.logger.error("some error",{e})
        }
    }
}

```

## API
#### `error( msg: string, args: PlainObject)`
#### `warn( msg: string, args: PlainObject)`
#### `fatal( msg: string, args: PlainObject)`
#### `info( msg: string, args: PlainObject)`
#### `debug( msg: string, args: PlainObject)`
