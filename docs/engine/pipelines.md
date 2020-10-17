---
id: pipeline
title: Pipelines
sidebar_label: Pipelines
---
Appolo Pipelines allows you to add a custom middleware to any class method using the pipeline decorator
with a pipeline you can change the arguments passed to the origin method or change the return value 

## Pipeline
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Method%20Decorator-red?style=for-the-badge" />

### Change  return value
```typescript
import {pipeline,IPipeline} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class SomeClass {
    
    @pipeline(PipelineTest)
    test(value:number){
        return value*value;
    }
}

@define()
export class PipelineTest implements IPipeline{

   async run(context:PipelineContext, next){
      
        let result = await next()
        
        return result*2
   }
}

injector.get<SomeClass>(SomeClass).test(2) // 8


```

### Change arguments value
```typescript
import {pipeline,IPipeline} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class SomeClass {
    
    @pipeline(PipelineTest)
    test(value:number){
        return value*value;
    }
}

@define()
export class PipelineTest implements IPipeline{

   async run(context:PipelineContext, next){
      
        let arg = context.getArgumentAt(0)
        
        context.setArgumentAt(arg*2);
        return next()
   }
}

injector.get<SomeClass>(SomeClass).test(2) // 16


```

### Call on single argument
```typescript
import {pipeline,IPipeline} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class SomeClass {
    
    
    test(@pipeline(PipelineTest) value:number,@pipeline(PipelineTest2) value2:number){
        return value*value;
    }
}
```

## PipelineType 
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Class%20Decorator-blue?style=for-the-badge" />

change the prototype of a class when defined

```typescript
import {pipelineType,IPipeline} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
@pipelineType(PipelineTest)
export class SomeClass {
    
}

@define()
export class PipelineTest implements IPipeline{

    run(context:PipelineContext, next){
        
        context.type.prototype["someNewfn"] = function(){...} 

        return next()
   }
}

```

## Pipeline Instance 
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Class%20Decorator-blue?style=for-the-badge" />

runs on an instance create 

```typescript
import {pipelineInstance,IPipeline} from '@appolo/engine';
import {define} from '@appolo/inject';
import {EventDispatcher} from '@appolo/events';

@define()
@pipelineInstance(PipelineTest)
export class SomeClass extends EventDispatcher {
    
    test(value:number){
       this.fireEvent("someEvent",value)
    }
}

@define()
export class PipelineTest implements IPipeline{

    run(context:PipelineContext, next){
        
        context.instance.on("someEvent",()=> {...})
        
        return next()
   }
}

```

## Pipeline Context
pipeline must implement `IPipeline` with `run` method
the run method will be called with pipeline `context` and `next` function
next must be called in order to continue the pipeline chain
 
### metaData
get metadata define during the pipeline decorator

```typescript
import {pipeline,IPipeline} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class SomeClass {
    
    @pipeline(PipelineTest,{someValue:2})
    test(value:number){
        return value*value;
    }
}

@define()
export class PipelineTest implements IPipeline{

   async run(context:PipelineContext, next){
      
        let arg = context.getArgumentAt(0)
        
        context.setArgumentAt(arg *  context.metaData.someValue);
        return next()
   }
}

```
### index
return the index number if the pipeline defined on method argument

### arguments
return `IArguments` of the origin method

### instance
return the current class instance

### type
return the class type

### action
return  string name of the method name

### argumentsTypes
return array of the arguments types
### setArgumentAt
return set argument value at index

### getArgumentAt
return  argument value at index

### values
return  array of argument values by index and type

## Logger example
```typescript
import {IPipeline,pipelineDecorator} from '@appolo/engine';
import {define} from '@appolo/inject';


@define()
export class LoggerPipeline implements IPipeline{

    @inject() logger:Ilogger;

   async run(context:PipelineContext, next){
        let time = Date.now()
        let result = await next(); //wait to all pipelines to run
        
        let params = {
            args:context.arguments,
            result,
            time:Date.now()-time
        };
        
        this.logger.info(`method called ${contrxt.action}`,params);

   }
}

export const log =   pipelineDecorator(LoggerPipeline)


@define()
export class SomeClass {
    
    @log()
    async test(value:number){
        return value
    }
}

```
