---
id: cqrs
title: Cqrs
sidebar_label: Cqrs
---
CQRS module 

## Installation

```typescript
npm i @appolo/cqrs
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `commandsBusId` | Commands Bus id name | `string` |`commandsBus`|
| `eventsBusId`   | Events Bus id name | `string` | `eventsBus` |
| `queryBusId` | QueryBus id name | `string` | `queryBus` |

in config/modules/all.ts

```typescript
import {CqrsModule} from '@appolo/cqrs';

export = async function (app: App) {
     app.module.use(CqrsModule);
}
```

## Commands
first we crate command and command handler.
The command handler will publish events on the commands bus.
we execute commands using `commandBus`.

```typescript
import {define, singleton} from '@appolo/inject'
import {command,CommandBus} from "@appolo/cqrs";

export class SomeCommand {
    constructor(public name:string) {
    }
}

@define()
@singleton()
export class SomeManager {

    @inject() commandBus: CommandBus;
  
    private async run() {
            
       await this.commandBus.execute(new SomeCommand("value"));
    }
}

```
now we create command handler that execute the command
```typescript
import {define, singleton} from '@appolo/inject'
import {command} from "@appolo/cqrs";

@define()
@singleton()
export class SomeCommandHandler {

    @inject() manager: Manager;
    @inject() eventsBus: EventsBus;
    
    @command()
    private async handleSomeCommand(command: SomeCommand) {
            
        let data  = await this.manager.getData(command.name);
        await this.eventsBus.publish(new SomeEventdata)
          
    }
}

```
## Events
events handlers listen to events bus and react to events
```typescript
import {define, singleton} from '@appolo/inject'
import {event} from "@appolo/cqrs";


export class SomeEvent {
    constructor(public name:string) {
    }
}

@define()
@singleton()
export class SomeEventHandler {
    
    @inject() manager: Manager;

   @event()
    private async handleSomeEvent(event: SomeEvent) {
       await this.manager.updateDb(event.name)
    }
   
}
```
## Queries
queries used to query handler asynchronously
```typescript
import {define, singleton} from '@appolo/inject'
import {query} from "@appolo/cqrs";

export class SomeQuery {
    constructor(id:string) {
    }
}

@define()
@singleton()
export class SomeQueryHandler {

    @inject() manager: Manager;

    @query()
    private async handleSomeEvent(command: SomeQuery) {
        return this.manager.getDataById(command.id)
    }
}
```
now we can query for data using the `queryBus`
```typescript
import {define, singleton} from '@appolo/inject'
import {QueryBus} from "@appolo/cqrs";

@define()
@singleton()
export class SomeManager {
    
    @inject() private queryBus: QueryBus;

    private async getDataById(id:string) {
        return queryBus.query<string>(new SomeQuery(id))
    }
}
```
## Sagas
sagas used to listen to multi events and fire new commands
```typescript
import {define, singleton} from '@appolo/inject'
import {saga,CommandBus} from "@appolo/cqrs";

@define()
@singleton()
export class SomeManager {
    
    @inject() commandBus: CommandBus;
    
    @saga([SomeEvent1,SomeEvent2])
    private async sagaHandler(id:string) {
        return commandBus.execute(new SomeCommand())
    }
}
```


## Bus
you can use cqrs with [@appolo/bus](./bus) and [class-transformer](https://github.com/typestack)

you will need to load the bus module in `modules` config

```typescript
import {BusModule} from '@appolo/bus';

export = async function (app: App) {
    app.module.use(BusModule.for({
        connection:"amqp://connection-string",
        exhcnage:"exhcnage",
        queue:"someQueue",
        requestQueue:"someRequestQueue",
        replyQueue:"someReplyQueue"
    }));
}
```

now call the commands events and queries will be published to rabbitMQ

```typescript
import {define, singleton} from '@appolo/inject'
import {command,CommandBus} from "@appolo/cqrs-bus";

export class SomeCommand {
    constructor(public name:string) {
    }
}

@define()
@singleton()
export class SomeManager {

    @inject() commandBus: CommandBus;
  
    private async run() {
            
       await this.commandBus.execute(new SomeCommand("value"));
    }
}

```

it is possible to define custom bus options 
```typescript
@commnad({type:"Some.MyCommand",routingKey:"Some.Key"})
export class SomeCommand {
    constructor(public name:string) {
    }
}
@define()
@singleton()
export class SomeCommandHandler {

    @inject() manager: Manager;
    @inject() eventsBus: EventsBus;

    // bus options will be merged with the handler
    @command({type:"Some.MyCommand2",routingKey:"Some.Key"})
    private async handleSomeCommand(command: SomeCommand) {

        let data  = await this.manager.getData(command.name);
        await this.eventsBus.publish(new SomeEventdata(),{expire:1000})

    }
}

```
