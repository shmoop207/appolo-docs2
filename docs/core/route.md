---
id: route
title: Route
sidebar_label: Route
---

Holds methods to handle routes and controllers.

## Usage
### use
#### `app.route.use(...middleware: ((req,res,next)=>void | typeof Middleware)[]): this`
add a global middleware to app [more](/docs/route/middlewares)
```typescript
app.route.use(SomeMiddleware)
    .use((req,res,next)=>next())
```

### error
#### `app.route.use(...middleware: ((err,req,res,next)=>void | typeof Middleware)[]): this`
add a global error middleware to app [more](/docs/route/errors)
```typescript
app.route.use(SomeMiddleware)
    .error((err,req,res,next)=>next())
```

### hooks
#### `app.route.hooks: Hooks`
get request hooks [more](/docs/route/hooks)


### getRoute
#### `getRoute(path: string, method: string): Route<IController>`
get route by a path and method
```typescript
let route = app.route.getRoute("/somepath","get")
   
```
### addRoute
#### `app.route.addRoute(route: Route<IController>)`
add new route

```typescript
let route = new Route<SomeController>().path("/somepath")
app.route.addRoute(route)
```
### addRouteFromClass
#### `app.route.addRouteFromClass(fn: Function)`
add new route from a class
```typescript
class SomeController extends Controller{
    @path("somepath")
     someAction(){}
}

app.route.addRouteFromClass(SomeController)
```



