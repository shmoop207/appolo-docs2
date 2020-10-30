---
id: interceptors
title: Interceptors
sidebar_label: Interceptors
---
Interceptors implemented on top of [pipelines](/docs/engine/pipeline). 
Interceptors pipeline must implement the `IInterceptor` interface.
Interceptor can change the method arguments or the return value.
Interceptor can decorate class method and argument.
>if the interceptor decorate a class it will run on all class methods.

## Examples

### Change arguments
```typescript
import {intercept,IInterceptor} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class ChangeValueInterceptor implements IInterceptor{

   async intercept(context:PipelineContext,next: () => Promise<any>){
        
        context.setArgumentAt(0,context.getArgumentAt(0)*2)

        return next()
   }
}

@define()
export class SomeClass {
    
    @intercept(ChangeValueInterceptor)
    test(value:number){
        return value*value;
    }
}

injector.get<SomeClass>(SomeClass).test(2) //8

```

### Timeout
you can also throw your own custom error
```typescript
@define()
export class InterceptorTimeout implements IInterceptor {

    public intercept(context: PipelineContext, next: () => Promise<any>) {
        return new Promise<T>((resolve, reject) => {
            let timeout =context.metaData.timeout;
            let interval = setTimeout(() => reject(new Error("promise timeout")), timeout);
            
            next().then(resolve)
                  .catch(reject)
                  .finally(() => clearTimeout(interval))
        })
    }
}
export const timeout = (timeout: number)=>  intercept(InterceptorTimeout, {timeout})


@define()
export class SomeClass {
    
    @timeout(1000)
    test(value:number){
        return  //do somthing async
    }
}

await injector.get<SomeClass>(SomeClass).test(2)

```

### Throw custom Error
```typescript
@define()
export class InterceptorError implements IInterceptor {

    public async intercept(context: PipelineContext, next: () => Promise<any>) {
       try{
            await next()

        } catch(e){
            throw new MyCustomError()
        }
    }
}
export const error = ()=>  intercept(InterceptorError, {})


@define()
export class SomeClass {
    
    @error()
    test(value:number){
       throw new SomeError()
    }
}

await injector.get<SomeClass>(SomeClass).test(2) // throw MyCustomError
```

### Runtime Log
```typescript
@define()
export class InterceptorLog implements IInterceptor {
    @inject() logger:Ilogger;
    public async intercept(context: PipelineContext, next: () => Promise<any>) {
        
        let time = Date.now(),
            result = await next(); //wait to all pipelines to run
               
            this.logger.info(`runtime ${contrxt.action} time: ${Date.now() - time}ms`);     
    }
}
export const log = ()=>  intercept(InterceptorLog, {})

@define()
export class SomeClass {
    
    @log()
    test(value:number){
       
    }
}
```

### Logic change
```typescript
@define()
export class InterceptorLogic implements IInterceptor {
    public async intercept(context: PipelineContext, next: () => Promise<any>) {
        
        if(context.value > context.metadata.value){    
            return next();
        } 
            
        return context.metadata.value
    }
}

export const logic = (value:number)=>  intercept(InterceptorLogic, {value})

@define()
export class SomeClass {
    
    @logic(5)
    test(value:number){
       return value*value
    }
}
await injector.get<SomeClass>(SomeClass).test(4) // 8
await injector.get<SomeClass>(SomeClass).test(6) // 5

```
