---
id: discovery
title: Discovery
sidebar_label: Discovery
---

Discovery class handles exported modules files and custom decorators.
Discovery can be injected or accessed from app context or used as static class. 

```typescript title="access discovery from app"
app.discovery.exported
```

```typescript title="create decorator"
import {Discovery} from '@appolo/core';
export const SomeDecorator = (value:string)=> Discovery.decorateReflectMetadata("SomeSymbol",{"name":value})
```

```typescript title="decorate some class"
@SomeDecorator("someValue")
export class SomeClass{

}
```

```typescript title="get decoratoed class"
import {define,init,inject} from '@appolo/inject';
import {Discovery} from '@appolo/core';

@define()
export class SomeManager {
    @inject() discovery:Discovery
    
    @init()
    private init(){
       let exported =  this.discovery.findReflectData("SomeSymbol");

       exported.metadata.name //  someValue
    }
}

```




## Usage
### getRoot
#### `getRoot<T extends Discovery = Discovery>(): T`
return root discovery instance
```typescript
app.discovery.getRoot() // Discovery
```

### getParent
#### `getParent<T extends Discovery = Discovery>(): T`
return parent discovery instance
```typescript
app.discovery.getParent() // Discovery
```

### exported
#### `get exported(): IExported[]`
getter return discovery exported files

```typescript title="IExported"
{
    fn: Function,  //class type
    path: string, // file path
    instance?: any // class instance
    define: Define // class inject definition 
}
```
 
```typescript
app.discovery.exported // IExported[]
```

### filterByType
#### `filterByType(fn: Class): IExported[]`
return filter exported by given fn type
```typescript
app.discovery.filterByType(SomeClass) // IExported[]
```

### findByType
#### `findByType(fn: Class): IExported`
return first match by class type
```typescript
app.discovery.findByType(SomeClass) // IExported
```

### findReflectData
#### `findReflectData<T>(symbol: Symbol | string): IExported & { metaData: T }`
find the first class matched given symbol metadata
```typescript
app.discovery.findReflectData<string>(SomeSymbol) // IExported &  { metaData: string }
```

### findAllReflectData
#### `findAllReflectData<T>(symbol: Symbol | string): (IExported & { metaData: T })[]`
return all class matched given symbol metadata
```typescript
app.discovery.findAllReflectData<string>("SomeSymbol") // (IExported &  { metaData: string })[]
```

### setReflectMetadata
#### `setReflectMetadata(key: string | Symbol, value: any, target: any, propertyKey?: string)`
set value by given symbol on target class.
* Also, available as static method.
```typescript
app.discovery.setReflectMetadata("SomeSymbol",{"some":"data"},SomeClass) 
```

### getReflectMetadata
#### `getReflectMetadata<T>(symbol: Symbol | string, klass: any, propertyName?: string, defaultValue?: T): T`
get value by given symbol on target class.
* Also, available as static method.
```typescript
app.discovery.getReflectMetadata("SomeSymbol",SomeClass) //  {"some":"data"} 

Discovery.getReflectMetadata("SomeSymbol",SomeClass) //  {"some":"data"} 
```

### decorateReflectMetadata
#### `decorateReflectMetadata(key: string | Symbol, value: any)`
create decorator function.
* Also, available as static method.
```typescript
let someDecorator = Discovery.decorateReflectMetadata("SomeSymbol",{"some":"data"})

@someDecorator
class SomeClass {
  
}
```

### getClassDefinition
#### `getClassDefinition(fn: Function): Define`
return `inject` class definition if exists.
* Also, available as static method.
```typescript
Discovery.getClassDefinition(SomeClass) // Define
```

### hasClassDefinition
#### `hasClassDefinition(fn: Function): boolean`
return true if given class has `inject` class definition.
* Also, available as static method.
```typescript
Discovery.hasClassDefinition(SomeClass) // true
```

### getClassId
#### `getClassId(fn: Function): string`
return class id from `inject` class definition.
* Also, available as static method.
```typescript
Discovery.getClassId(SomeClass) // "someClass"
```

### getClassName
#### `getClassName(fn: Function): string`
return class name.
* Also, available as static method.
```typescript
Discovery.getClassName(SomeClass) // "someClass"
```

### getControllerName
#### `getControllerName(controller: string | typeof Controller | typeof StaticController)`
return class controller name.
* Also, available as static method.
* Only available on root Discovery `@appolo/core`.
```typescript
Discovery.getControllerName(SomeContoller) // "someClass"
```

### decorateRequest
#### `decorateRequest(name: string, fn: Function)`
extend `@appolo/agent` request prototype
* Also, available as static method.
* Only available on root Discovery `@appolo/core`.
```typescript
Discovery.decorateRequest("getSomeId",function() {
   return this.ip
}) 
```

### decorateResponse
#### `decorateResponse(name: string, fn: Function)`
extend `@appolo/agent` response prototype
* Also, available as static method.
* Only available on root Discovery `@appolo/core`.
```typescript
Discovery.decorateResponse("setMyHeader",function(value:string) {
   return this.header("My-header",value)
}) 
```

### getRouteDefinition
#### `getRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T>`
return controller route definition
* Also, available as static method.
* Only available on root Discovery `@appolo/core`.
```typescript
Discovery.getRouteDefinition(SomeController) // Route<SomeController>
```

### createRouteDefinition
#### `createRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T>`
create controller route definition.
* Also, available as static method.
* Only available on root Discovery `@appolo/core`.
```typescript
let route  = Discovery.createRouteDefinition(SomeController); // Route<SomeController>
route.path("/some/path")
```

### isController
#### `isController(fn: any): boolean`
return true if given class is a controller.
* Also, available as static method.
* Only available on root Discovery `@appolo/core`.
```typescript
 Discovery.isController(SomeController); // true
```

