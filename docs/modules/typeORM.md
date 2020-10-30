---
id: typeorm
title: TypeORM
sidebar_label: TypeORM
---
TypeORM module  built with [TypeORM](https://github.com/typeorm/typeorm)

## Installation

```typescript
npm i @appolo/typeorm
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `ModelRepository` injection id | `string`|  `modelRepository`|
| `config` | typeorm connection [options](https://github.com/typeorm/typeorm#creating-a-connection-to-the-database) | `object` | {} |


in config/modules/all.ts

```typescript
import {TypeOrmModule} from '@appolo/typeorm';

export = async function (app: App) {
    app.module.use( TypeOrmModule.for({
        config: {
            type: "postgres",
            url: process.env.POSTGRES_URL,
            ssl: true,
    }}));
    
}
```

## Usage
```typescript
import {define, singleton} from '@appolo/inject'
import {Entity,Column,model,Index,PrimaryGeneratedColumn,Repository} from "@appolo/typeorm";

@model()
@Entity({name: "user"})
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: "varchar",
        length: 100
    })
    name: string;
   
    @Column({
        type: "varchar",
        length: 100
    })
    @Index()
    email: string;
}

@define()
@singleton()
export class SomeManager {

    @injectModel(User) userModel: Repository<User>;

    async getUser(id:string): Promise<User> {
        let user = await this.userModel.findOne(id)

        return user;
    }
}


```

## ModelRepository
with modelRepository you can access to the typeorm repositories and db connection.

### connection
getter return typeorm connection

### getModel
#### getModel<T\>(model: typeof Schema): Model<T\>
return mongoose model by schema type
```typescript
@define()
@singleton()
export class SomeManager {

    @inject() modelRepository:ModelRepository;

    async getUser(id:string): Promise<User> {
        let user = await this.modelRepository.getModel(User).findOne(id)

        return user;
    }
}
```
