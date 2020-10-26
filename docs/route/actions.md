---
id: actions
title: Actions
sidebar_label: Actions
---
Actions are invoked on route match. 

Action can return a promise or an object that will be passed to `res.send` with status code 200

It can also call response directly `res.send("ok")`.

## Request Decorators
### Req, Res
inject request, response in to action params
```typescript
import {controller,IRequest,IResponse,req,res} from '@appolo/route';

@controller()
export class SomeController extends StaticController{

	@post("/some/data")
    public aynsc loginUser(@req req:IRequest,@res() res:IResponse){
        return res.status(200).send("ok")
    }
}
```

### Query
inject query object,in to action params

```typescript
import {controller,IRequest,IResponse,query} from '@appolo/route';

@controller()
export class SomeController extends StaticController{

	@post("/some/data")
    public aynsc getData(@query("user") user:string,@query() query:any){
        return {data:user || query.user}
    }
}
```

### Body
inject body object,in to action params

```typescript
import {controller,IRequest,IResponse,body} from '@appolo/route';

@controller()
export class SomeController extends StaticController{

	@post("/some/data")
    public aynsc getData(@body("user") user:string,@body() body:any){
        return {data:user || body.user}
    }
}
```

### Headers
inject body object,in to action params

```typescript
import {controller,IRequest,IResponse,headers} from '@appolo/route';

@controller()
export class SomeController extends StaticController{

	@post("/some/data")
    public aynsc getData(@headers("user-agent") userAgent:string,@headers() headers:any){
        return {data:userAgent || headers["user-agent"]}
    }
}
```

### Params
inject params object,in to action params

```typescript
import {controller,IRequest,IResponse,params} from '@appolo/route';

@controller()
export class SomeController extends StaticController{

	@post("/some/data/:id")
    public aynsc getData(@params("id") id:string,@params() params:any,@param() id2:string){
        return {data:id || params.id || id2}
    }
}
```

### Custom Request
you can define you own custom request action parameters

```typescript
import {controller,IRequest,IResponse,customRouteParam} from '@appolo/route';

let user = customRouteParam((req:IRequest,res:IResponse,route)=>{
    return res.body["userId"]
}

@controller()
export class SomeController extends StaticController{

	@post("/some/data")
    public aynsc getData(@user user:string){
        return {data:user}
    }
}
```


## Response Decorators

### StatusCode
specify a custom statusCode default `200`
```typescript
import {controller,IRequest,IResponse,statusCode} from '@appolo/route';
@controller()
export class LoginController extends StaticController{


	@get("/some/data")
    @statusCode(201)
    public aynsc getData(req:IRequest,res:IResponse){
        return {data:"user"}
    }

    @get("/some/data2")
    public aynsc getData2(req:IRequest,res:IResponse){
        res.status(201)
        return {data:"user"}
    }
}
```

### Headers
specify a custom response header
```typescript
import {controllerIRequest,IResponse,header} from '@appolo/route';
@controller()
export class LoginController extends StaticController{


	@get("/some/data")
    @header('Cache-Control', 'none')
    public aynsc getData(req:IRequest,res:IResponse){
        return {data:"user"}
    }

    @get("/some/data2")
    public aynsc getData(req:IRequest,res:IResponse){
        res.header("Cache-Control","none")
        return {data:"user"}
    }
}
```

### Gzip
it is possible to compress the response with gzip by calling `res.gzip`
```typescript
import {controller,singleton,inject,IRequest,IResponse} from '@appolo/route';
@controller()
export class LoginController extends StaticController{

    @get("/some/data")
    public aynsc getData(req:IRequest,res:IResponse){
        res.gzip();
        return return {data:"some big data"}
	}

	@get("/some/data2")
    public aynsc getData2(req:IRequest,res:IResponse){
        res.gzip().send({data:"some big data"})
    }

    @get("/some/data3")
    @gzip()
    public aynsc getData3(req:IRequest,res:IResponse){
        return {data:"some big data"}
    }
}

```

### Cache Control
specify Cache-Control header in seconds
```typescript
import {controller,IRequest,IResponse,statusCode,cacheControl} from '@appolo/route';
@controller()
export class LoginController extends StaticController{


	@get("/some/data")
    @cacheControl(1000)
    public aynsc getData(req:IRequest,res:IResponse){
        return {data:"user"}
    }

    @get("/some/data2")
    public aynsc getData(req:IRequest,res:IResponse){
        res.cache(1000)
        return {data:"user"}
    }
}
```

### Custom Response
you can define your own custom action response decorators

```typescript
import {controller,IRequest,IResponse,customRouteDecorator} from '@appolo/route';

let myDecorator = customRouteDecorator((req:IRequest,res:IResponse,route)=>{
    res.setHeader("x-test","true")
    res.status(201)
}

@controller()
export class SomeController extends StaticController{

	@get("/some/data")
    @myDecorator
    public aynsc getData(req:IRequest,res:IResponse){
        return {data:"user"}
    }
}
```






