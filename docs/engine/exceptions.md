---
id: exceptions
title: Exceptions
sidebar_label: Exceptions
---
Exceptions  implemented on top of [pipelines](/docs/engine/pipeline).
Exceptions can catch the method exception and transform the return value
Exceptions must implement the `IException` interface.

>if the exception decorate a class it will run on all class methods.


## Usage
### Catch
we create custom error filter and override the default error handling
```typescript
import {exception,IException} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class CatchErrorPipe implements IPipe{

   async catch(err:Error,context:PipelineContext){
      let req = context.getRequest();

        const statusCode = err instanceof HttpError
                ? err.statusCode
                : 500;
       
        return {
            statusCode: statusCode,
            message:err.message,
            timestamp: new Date().toISOString(),
            path: req.url,
        }
   }
}

export const catchError = ()=> exception(CatchErrorPipe);
```

now lets use out date pipe

```typescript  
 @controller()
 export class SomeController extends Controller{
    
     @get("/some/data")
     @catchError()
     public async getData(){
        let data = await this.dataMagaer.getData()
         return data
     }
 }
```
