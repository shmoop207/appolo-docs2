---
id: modules
title: Modules
sidebar_label: Modules
---

Holds methods to handle loading of modules.

## Usage
### use
#### `app.module.use(...module: ModuleArg []): this`
add a module to app
```typescript
app.module.use(SomeModule)
    .use({type:SomeModule,{"some":"options"}})
```
load modules simultaneously
```typescript
app.module.use(SomeModule,SomeModule2)
```
### load
#### `app.module.load(...module: ModuleArg []): Promise<Module[]>`
load module instantly without waiting for app launch.
return promise with the module loaded.
```typescript
await app.module.load(LoggerModule) // Promise<Module[]>
```
### loadFn
#### `app.module.loadFn(...fn: ModuleFunction[]): Promise<void>`
instantly load module function
```typescript
await app.module.loadFn(async function(env:IEnv,injector:Injector,app:App){
    injector.addObject('someId','someValue')
}) 
```
### moduleAt
#### `app.module.moduleAt<T extends Module>(index: number): T`
return module by index
```typescript
app.modules.moduleAt(0) // Module
```
### modulesByType
#### `app.module.modulesByType<T extends Module>(type: IModuleCrt): T[]`
getter return current app children apps
```typescript
app.modules.modulesByType(SomeModule) // SomeModule[]
```



