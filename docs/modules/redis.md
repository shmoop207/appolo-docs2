---
id: redis
title: Redis
sidebar_label: Redis
---
Redis module  built with [ioredis](https://github.com/luin/ioredis)

## Installation

```npm
npm i @appolo/redis
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `redisProvider` injection id | `string`|  `redisProvider`|
| `connection` | redis connection string | `string` | null |
| `opts` | redis [connection](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options) options | `object` | {} |
| `scripts` | redis lua scripts | `object` | {} |

### Scrips Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `name` | name of the script | `string`|  ``|
| `path` | path of the script | `string` | `` |
| `lua` | path or the lua string | `string` | `` |
| `args` | number of script arguments | `number` | 0 |
in config/modules/all.ts

```typescript
import {RedisModule} from '@appolo/redis';

export = async function (app: App) {
     app.module.use(RedisModule.for({
        connection:"redis://redis-connection-string"
    }));

    //or with custom lua script
    app.module.use( RedisModule.for({
        connection:"redis://redis-connection-string",
        scripts:[{
            name:'echo',
            args: 2,
            lua: 'return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}'
        }]

   }));
}
```

## Usage
```typescript
import {define, singleton} from '@appolo/inject'
import {RedisProvider} from "@appolo/redis";

@define()
@singleton()
export class SomeManager {

    @inject() redisProvider:RedisProvider;

    async run(data:any): Promise<any> {
        await this.redisProvider.set("test",data)

        let result = await this.redisProvider.get("test")

        return result;
    }
}

```

## RedisProvider
### get
#### `get<T>(key: string): Promise<T>`
get item from redis by key

### set
#### `set<T>(key: string, value: T): Promise<T>`
set value by key the value converted to string with `JSON.stringify` before set

### getAllHash
#### `getAllHash<T>(key: string): Promise<{ [index: string]: T }>`
get all items in hash map in key value object

### getHashKeys
#### `getHashKeys<T>(key: string): Promise<string[]>`
get all hash keys as array

### getHashValues
#### `getHashValues<T>(key: string): Promise<T[]>`
get all hash value as array

### getByExpire
#### `getByExpire<T>(key: string, expire: number): Promise<{ value: T, validExpire: boolean }>`
get item by key with expire if current ttl is less then expire/2 then validExpire will be false
```typescript
await this.redisProvider.setWithExpire("test",{data:true},1000)

let result = await this.redisProvider.getByExpire("test",1000)

result.validExpire // true
```
### setHash
#### `setHash<T>(hashMap: string, key: string, value: T): Promise<T>`
set value in hash map

### getHash
#### `getHash<T>(hashMap: string, key: string): Promise<T>`
get value from hash map
### delHash
#### `delHash(hashMap: string, ...keys: string[]): Promise<void>`
delete value from hash map
### del
#### `del(...keys: string[]): Promise<void>`
delete item by key

### delPattern
#### `delPattern(pattern: string): Promise<void>`
delete item by pattern
```typescript
await this.redisProvider.delPattern("*test*")
```
### setWithExpire
#### `setWithExpire<T>(key: string, value: T, seconds: number): Promise<T>`
set item with expire in seconds

### expire
#### `expire(key: string, seconds: number): Promise<void>`
set key expire in seconds

### scan
#### `scan(pattern: string): Promise<string[]>`
return array for keys

### scanHash
#### `scanHash<T>(key: string, pattern: string = '*'): Promise<{ [index: string]: T }>`
return hash keys by pattern in key value object
### scanHashValues
#### `scanHashValues<T>(key: string, pattern: string = '*'): Promise<T[]>`
return hash values by pattern in array

### ttl
#### `ttl(key: string): Promise<number>`
return key ttl

### increment
#### `increment(key: string, count: number = 1): Promise<void>`
increment value by count

### incrementExpire
#### `incrementExpire(key: string, seconds: number, count: number = 1): Promise<void>`
increment value by count and expire in seconds

### lock
##### `lock(key: string, seconds: number, updateLockTime: boolean = false): Promise<boolean>`
return true if value  locked, if not lock it for x seconds
#### unlock
#### `unlock(key: string): Promise<void>`
unlock key

### runScript
#### `runScript<T>(name: string, keys: string[], values: any[], parse: boolean = true): Promise<T>`
run lua script by script name
