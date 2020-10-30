---
id: socket
title: Socket
sidebar_label: Socket
---
socket module built with [socket.io](https://socket.io/)

## Installation

```npm
npm i @appolo/scoket
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `SocketProvider` injection id | `string`|  `socketProvider`|
| `auto` | true to auto initialize socket listen events | `boolean` | `true` |
| `redis` | redis connection for sockets sync   | `string` | `null` |
| `socket` | socket options | `object` | `{"transports": ["websocket"]}` |

in config/modules/all.ts

```typescript
import {ScoketModule} from '@appolo/socket';

export = async function (app: App) {
    app.module.use(ScoketModule.for({
        redis:"redis://redis-connection-string"
    }));
}
```


## SocketController
will be created on socket new connection and holds the socket instance.
must be inherited from `SocketController` and defined using `@socket`.

you can define custom namespace using `@socket("someNamespace")` default to `/`.

you subscribe to socket events using `@action('someEvent')` the return object from the action will be passed to socket callback id exists
promises also supported.

```typescript
import {action, socket, SocketController} from "@appolo/socket";

@socket()
export class MySocketController extends SocketController {

    @action("someAction")
    public async test(name: string) {
        let someData  = await doSomeThingAsync();

        return {arg:name,someData}
    }
}
```
socket client
```typescript
import * as io from 'socket.io-client';

let socket = io("http://localhost:8080")

socket.emit("someAction", "working" ({arg})=>{
    console.log(arg) // working
})

```
### Hooks
- `onInitialized` - called when socket initialized
- `onDisconnected` - called when socket disconnected
- `onConnected` - called when socket connected


```typescript
import {action, socket, SocketController} from "@appolo/socket";

@socket()
export class MySocketController extends SocketController {

    @action("someAction")
    public test(name: string) {
        return {arg:name}
    }

    onDisconnected(){
        // do something
    }
}
```

### `socket`
#### `get socket(): socketIo.Socket`
getter return `socket` instance
### `id`
#### `get id(): string`
getter return `socket` id
### `send`
#### `send(event: string, data: any)`
emit socket event

## Middleware
Middleware can be used before socket connect

```typescript
import {IMiddleware} from "@appolo/socket";

@define()
export class TokenMiddleware implements IMiddleware {

    run(socket: socketIo.Socket, next: NextFn) {
        if (socket.handshake.query.token == "1") {
            socket.request.user = 1;
            next()
        } else {
            next(new Error("invalid token"))
        }
    }
}
```

```typescript
@socket()
@middleware(TokenMiddleware)
export class MySocketController extends SocketController {

    private user:any;
    onConnected(){

        this.user = this.socket.request.user
    }

    @action("test")
    public test() {
        return {user:this.user}
    }
}
```


## SocketProvider
holds all the socket controllers.
can send messages to all sockets and namespaces


```typescript
import {ScoketProvider} from "@appolo/socket";

@define()
export class SomeManager  {

    @inject() socketProvider:ScoketProvider

    notifyAll(){
        this.socketProvider.sendToAll("someEvent",{some:"data"})
    }
}
```
### `sendToAll`
#### `sendToAll(event: string, data: any)`
event message to all clients

### `sendToNamespace`
#### `sendToNamespace(namespace: string, event: string, data: any)`
event message to all clients in a namespace
### `clients`
#### `get clients(): Map<string, SocketController>`
getter Map of all sockets by id
