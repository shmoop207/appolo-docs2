---
id: pubsub
title: PubSub
sidebar_label: PubSub
---
pubsub module built with [ioredis](https://github.com/luin/ioredis#pubsub)

## Installation

```typescript
npm i @appolo/pubsub
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `PubSubProvider` injection id | `string`|  `pubSubProvider`|
| `auto` | true to auto initialize pubsub listen events | `boolean` | `true` |
| `connection` | redis connection string | `string` | null |

in config/modules/all.ts

```typescript
import {PubSubModule} from '@appolo/pubsub';

export = async function (app: App) {
    app.module.use(PubSubModule.for({
        connection:"redis://redis-connection-string"
    }));
}
```

## Usage

### Publisher
```typescript
import {define, singleton} from '@appolo/inject'
import {PubSubProvider} from "@appolo/pubsub";

@define()
@singleton()
export class SomePublisher {

    @inject() pubSubProvider:PubSubProvider

    async publish(data:any): Promise<any> {
        return this.pubSubProvider.publish("test",data)
    }
}

```
### Handler
```typescript
import {define, singleton} from '@appolo/inject'
import {handler} from "@appolo/pubsub";

@define()
@singleton()
export class SomeHandler {

    @handler("test")
    handle(data: any) {
       //do something
    }

    @handler("someName")
    handle(data: any) {
        //do some thing
    }
}
