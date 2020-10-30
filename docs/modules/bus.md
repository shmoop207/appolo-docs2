---
id: bus
title: Bus
sidebar_label: Bus
---
RabbitMQ bus module built with [appolo-rabbit](https://github.com/shmoop207/appolo-rabbit)

## Installation

```typescript
npm i @appolo/bus
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` |  injection id | `string`|  `busProvider`|
| `connection` | AMQP connection string | `string` | null |
| `autoListen` | true to auto initialize busProvider and start listen to events | `boolean` | `true` |
| `handleEvents` | true to register queue event handlers | `boolean` | `true` |
| `exchange` | name of the exchange or exchange options | `string` |`{}` |  |
| `queue` | queue options  | `object` | `{}` |
| `requestQueue` | request queue options  | `object` | `{}` |
| `replayQueue` | request queue options  | `object` | `{}` |
| `appendEnv` | append `env` name to queueName and exchangeName  | `boolean` | `true` |

### Exchange Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `type` | request queue options or `false to disable` | `string` | `topic` |
| `autoDelete`  | delete when consumer count goes to 0 | boolean | `false` |
| `durable` |  survive broker restarts |boolean | `true` |
| `persistent`  | persistent delivery, messages saved to disk| boolean | `true` |
| `alternate` |   define an alternate exchange | string | |
| `publishTimeout` |  timeout in milliseconds for publish calls to this exchange | `2^32` |
| `replyTimeout` |  timeout in milliseconds to wait for a reply | `2^32` | |
| `limit` |  the number of unpublished messages to cache while waiting on connection | `2^16` | |
| `noConfirm` |  prevents rabbot from creating the exchange in confirm mode | boolean | false |


### Queue Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `autoDelete` |  delete when consumer count goes to 0 | boolean | `false`|
| `durable` |  survive broker restarts | boolean | `true` |
| `subscribe` |  auto-start the subscription | boolean | `false` |
| `limit` | max number of unacked messages allowed for consumer | 2^16 | `1`|
| `noAck` |  the server will remove messages from the queue as soon as they are delivered | boolean | false |
| `noBatch` |  causes ack, nack & reject to take place immediately | boolean | `false` |
| `noCacheKeys` |  disable cache of matched routing keys to prevent unbounded memory growth | boolean | false |
| `queueLimit` | max number of ready messages a queue can hold | 2^32 | |
| `messageTt` | time in ms before a message expires on the queue | 2^32 | |
| `expires` | time in ms before a queue with 0 consumers expires | 2^32 | |
in config/modules/all.ts

```typescript
import {BusModule} from '@appolo/bus';

export = async function (app: App) {
    app.module.use(BusModule.for({
        connection:"amqp://connection-string",
        exhcnage:"exhcnage",
        queue:"someQueue"
    }));
}
```

## Usage

### Publisher

we inject BusProvider in order to publish messages
```typescript
import {define, singleton,inject} from '@appolo/inject'
import {BusProvider} from "@appolo/bus";

@define()
@singleton()
export class SomePublisher {

    @inject() busProvider:BusProvider

    publish(data:any): Promise<any> {
        return this.busProvider.publish({routingKey:"test",data})
    }
}

```
### Handler
if you don not call msg ack or nack
it will be called on handler return `msg.ack()` or `msg.nack()` on error

```typescript
import {define, singleton} from '@appolo/inject'
import {handler} from "@appolo/bus";

@define()
@singleton()
export class SomeHandler {

    @handler("test")
    handle(msg: IMessage<data>) {
       //do something
    }

    @handler("someName")
    handle(msg: IMessage<data>) {

        try{
           //do some thing

           msg.ack();
        }
        catch(){
            msg.nack();
        }
    }
}
```

### Request
we can await a response and set expire timout
if timeout reached timeout error will be thrown
```typescript
import {define, singleton} from '@appolo/bus'
import {BusProvider} from "@appolo/bus";

@define()
@singleton()
export class SomePublisher {

    @inject() busProvider:BusProvider

    public async getData(params:any): Promise<any> {
        let data = await  this.busProvider.request({
            routingKey:"test",
            params,
            expire:5000})

        return data;
    }
}

```

### Reply
we define reply answer handler
```typescript
import {define, singleton} from '@appolo/inject'
import {handler} from "@appolo/bus";

@define()
@singleton()
export class SomeHandler {



    @reply("test")
    handle(msg: IMessage<data>) {
        return {userId:1}
    }

    // or reply methods
    @reply("someName")
    handle(msg: IMessage<data>) {

        try{
            //get some data
         msg.replySuccess(msg,{userId:1})
        }
        catch(){
            msg.replyError(msg,e)
        }
    }
}
```

## IMessage
each handler and reply handler called with message object
```typescript
{
  // metadata specific to routing & delivery
  fields: {
    consumerTag: "", // identifies the consumer to rabbit
    deliveryTag: #, // identifies the message delivered for rabbit
    redelivered: true|false, // indicates if the message was previously nacked or returned to the queue
    exchange: "" // name of exchange the message was published to,
    routingKey: "" // the routing key (if any) used when published
  },
  properties:{
    contentType: "application/json", // see serialization for how defaults are determined
    contentEncoding: "utf8", // rabbot's default
    headers: {}, // any user provided headers
    correlationId: "", // the correlation id if provided
    replyTo: "", // the reply queue would go here
    messageId: "", // message id if provided
    type: "", // the type of the message published
    appId: "" // not used by rabbot
  },
  content: { "type": "Buffer", "data": [ ... ] }, // raw buffer of message body
  body: , // this could be an object, string, etc - whatever was published
  type: "" // this also contains the type of the message published
}
```

### ack
#### `message.ack()`
Enqueues the message for acknowledgement.

### reject
#### `message.nack()`
Enqueues the message for rejection. This will re-enqueue the message.

### reject
#### `message.reject()`
Rejects the message without re-queueing it. Please use with caution and consider having a dead-letter-exchange assigned to the queue before using this feature.

### reply
#### `reply( data:any )`
Acknowledges the messages and sends the message back to the requestor.

### replySuccess
#### `replySuccess( data:T )`
reply the message with json object `{success: true,data}`

### replyError
#### `message.replyError( e: RequestError<T> )`
reply the message with json object `{success: false,message: e.message, data:e.data}`

## BusProvider

### initialize
#### `initialize()`
initialize busProvider and start listen to events if not in in `auto` mode

### publish
#### `publish(type: string, data: any, expire?: number): Promise<void>`
publish event
- type -  event name
- data - any data
- expire - timeout until the message is expired in the queue

### request
#### `request<T>(type: string, data: any, expire?: number): Promise<T>`
request data by event return promise with event response
- type -  event name
- data - any data
- expire - timeout until the request is rejected

### close
#### `close<T>(): Promise<void>`
close the connection and clean all handlers

### getQueueMessagesCount
#### `getQueueMessagesCount(): Promise<number>`
return number of pending events in the queue
