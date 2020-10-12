---
id: injector
title: Injector
sidebar_label: Injector
---

`injector` holds application container it can be injected to any class

## Usage
```typescript
import {define,singleton,inject,init} from '@appolo/inject';

@define()
export class FooManager{
    @inject() injector:Injector

    doSomeThing(){
        return this.injector.get("someObject")
    }
}
```

## API

### get
#### `get<T>(objectID: string | Function, runtimeArgs?: any[]): T`
return object instance by id or class type if the instance not found error is throw<br/>
if the object is not singleton run time args can be passed to object instance
```typescript
let instance = injector.get("someId")
let instance3 = injector.get("someId2",["arg1","arg2"])
```

### getAsync
#### `getAsync<T>(objectID: string | Function, runtimeArgs?: any[]): Promise<T>`
same as `get` return promise after the instance initAsyc method resolved 

```typescript
let instance = await injector.getAsync("someId")
```
### resolve
#### `resolve<T>(objectID: string | Function, runtimeArgs?: any[]): T`
same as `get` but if the instance not found `null` is returned

### getInstance
#### `getInstance<T>(id: string): T`
get singleton instance by id if not found `null` is returned

### hasInstance
#### `hasInstance(id: string): boolean`
return true if singleton instance exists

### addInstance
#### `addInstance(instanceId: string, instance: any): Injector`
add instance by instance id

```typescript
 injector.addInstance("someId",{"some":"thing"})
```

### removeInstance
#### `removeInstance(objectId: string): Injector`
remove instance by id
### getObjectsByType
#### `getObjectsByType<T>(type: Function): T[]`
return array of matched objects by type

### getInstances
#### `getInstances(): { [id: string]: { [index: string]: any } }`
get all instances index by id

### getDefinitions
#### `getDefinitions(): { [id: string]: IDefinition }`
get all definitions index by id

### getDefinitionsValue
#### `getDefinitionsValue(): IDefinition[]`
get all definitions array

### getTypes
#### getTypes(): Function[]
get all Classes

### hasDefinition
#### `hasDefinition(id: string): boolean`
return true if definition exists

### getDefinition
#### `getDefinition(id: string): IDefinition`
get definition by id

### addDefinition
#### `addDefinition(objectId: string, definition: IDefinition): Injector`
add definition by id
```typescript
injector.addDefinition("someId",{type:SomeClass})
```

### addAlias
#### `addAlias(aliasName: string, value: any)`
add alias by alias name

### removeAlias
#### `removeAlias(aliasName: string, value: any)`
remove alias by name and value

### getAlias
#### `getAlias(aliasName: string): any[]`
get all instances by alias name

### addAliasFactory
#### `addAliasFactory(aliasName: string, value: any)`
add alias by alias name

### removeAliasFactory
#### `removeAliasFactory(aliasName: string, value: any)`
remove alias by name and value

### getAliasFactory
#### `getAliasFactory(aliasName: string): any[]`
get all instances by alias name

### getFactoryMethod
#### `getFactoryMethod(objectId: string | Function)`
return factory create method by id

### register
#### `register(id: string | Class, type?: Class, filePath?: string): Define`
register new definition
```typescript
class SomeClass{
    initialize(){}
}

injector.register('someClass', SomeClass)
    .singleton()
    .initMethod('initialize')
    .inject("someOtherClass")
    .alias("someName")
```
