---
id: events
title: Events
sidebar_label: Events
---

Holds all app events methods.

## Usage
### onModuleExport
#### `app.events.onModuleExport`
fires on module export item 

```typescript
app.events.onModuleExport.on(action=>{
    console.log(action.type,action.id)
}) 
```

### beforeModuleInitialize
#### `app.events.beforeModuleInitialize`
fires before module initialize

```typescript
app.events.beforeModuleInitialize.on(action=>{
    console.log(action.module.env)
}) 
```

### afterModuleInitialize
#### `app.events.afterModuleInitialize`
fires after the module initialized

```typescript
app.events.afterModuleInitialize.on(action=>{
    console.log(action.module.env)
}) 
```

### beforeModulesLoad
#### `app.events.beforeModulesLoad`
fires before modules start loading

```typescript
app.events.beforeModulesLoad.on(()=>{
    
}) 
```

### afterModulesLoaded
#### `app.events.afterModulesLoaded`
fires after modules finished loading

```typescript
app.events.afterModulesLoaded.on(()=>{
    
}) 
```

### beforeInjectorInitialize
#### `app.events.beforeInjectorInitialize`
fires before app injector initialize

```typescript
app.events.afterModulesLoaded.on(()=>{
    
}) 
```

### afterInjectorInitialize
#### `app.events.afterInjectorInitialize`
fires after app injector initialized

```typescript
app.events.afterInjectorInitialize.on(()=>{
    
}) 
```

### beforeBootstrap
#### `app.events.beforeBootstrap`
fires before app bootstrap

```typescript
app.events.beforeBootstrap.on(()=>{
    
}) 
```

### afterBootstrap
#### `app.events.afterBootstrap`
fires after app bootstrap

```typescript
app.events.afterBootstrap.on(()=>{
   
}) 
```

### afterLaunch
#### `app.events.afterLaunch`
fires after app launch complete

```typescript
app.events.afterLaunch.on(()=>{
   
}) 
```

### beforeReset
#### `app.events.beforeReset`
fires before app reset

```typescript
app.events.beforeReset.on(()=>{
   
}) 
```


### afterReset
#### `app.events.afterReset`
fires after app reset

```typescript
app.events.afterReset.on(()=>{
    
}) 
```

### beforeInjectRegister
#### `app.events.beforeInjectRegister`
fires before class is register in injector

```typescript
app.events.beforeInjectRegister.on((action)=>{
    console.log(action.type,action.filePath)
}) 
```

### onClassExport
#### `app.events.onClassExport`
fires on class exported for the file system

```typescript
app.events.onClassExport.on((action)=>{
    console.log(action.type,action.filePath)
}) 
```

### afterInjectRegister
#### `app.events.afterInjectRegister`
fires on class exported for the file system

```typescript
app.events.afterInjectRegister.on((action)=>{
    console.log(action.definition.id,action.filePath)
}) 
```

### onOwnInstanceInitialized
#### `app.events.onOwnInstanceInitialized`
fires on app instance initialized

```typescript
app.events.onOwnInstanceInitialized.on((action)=>{
    console.log(action.definition.id,action.instance)
}) 
```

### onInstanceInitialized
#### `app.events.onInstanceInitialized`
fires on app and sub modules instance initialized

```typescript
app.events.onInstanceInitialized.on((action)=>{
    console.log(action.definition.id,action.instance)
}) 
```

### onOwnInstanceCreated
#### `app.events.onOwnInstanceCreated`
fires on app instance created

```typescript
app.events.onInstanceInitialized.on((action)=>{
    console.log(action.definition.id,action.instance)
}) 
```

### onInstanceCreated
#### `app.events.onInstanceCreated`
fires on app and sub modules instance created

```typescript
app.events.onInstanceCreated.on((action)=>{
    console.log(action.definition.id,action.instance)
}) 
```

### beforeInjectInitMethods
#### `app.events.beforeInjectInitMethods`
fires before inject start run init methods

```typescript
app.events.beforeInjectInitMethods.on(()=>{
}) 
```


### beforeInjectBootstrap
#### `app.events.beforeInjectBootstrapMethods`
fires before inject start run bootstrap  methods

```typescript
app.events.beforeInjectBootstrapMethods.on(()=>{
}) 
```

### onRouteRegister
#### `app.events.onRouteRegister`
fires when route registered in router

```typescript
app.events.onRouteAdded.on((action:{ route: Route<IController> })=>{
    console.log(action.route.definition)

}) 
```

### onRouteAdded
#### `app.events.onRouteAdded`
fires when route  added to the router

```typescript
app.events.onRouteAdded.on((action)=>{
    console.log(action.path,action.method)

}) 
```


### beforeServerOpen
#### `app.events.beforeServerOpen`
fires before server open

```typescript
app.events.beforeServerOpen.on(()=>{
    
}) 
```

### afterServerOpen
#### `app.events.afterServerOpen`
fires after server open

```typescript
app.events.afterServerOpen.on(()=>{
    
}) 
```

### beforeServerClosed
#### `app.events.beforeServerClosed`
fires before the server closed

```typescript
app.events.beforeServerClosed.on(()=>{
    
}) 
```

### afterServerClosed
#### `app.events.afterServerClosed`
fires after the server closed

```typescript
app.events.afterServerClosed.on(()=>{
    
}) 
```



