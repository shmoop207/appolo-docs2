---
id: pipes
title: Pipes
sidebar_label: Pipes
---
Pipes  implemented on top of [pipelines](/docs/engine/pipeline).
Pipes run on method arguments and can transform argument value
Pipe must implement the `IPipe` interface.
>if the pipe decorate a class it will run on all class methods.

> if pipe decorate a method it will run on the first argument

## Usage
### Transform
```typescript
import {pipe,IPip} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class DatePipe implements IPipe{

   async transform(value:number,context:PipelineContext){
      
        return new Date(value);
   }
}

export const date = ()=> pipe(DatePipe);
```

now lets use out date pipe
```typescript
@define()
export class SomeClass {
    
    @date()
    test(value:Date|number){
        return value;
    }
}

injector.get(SomeClass).test(1604047612) instanceof Date //true 

```

### Validate
we can validate the argument and throw error

```typescript
import  {pipe,IPip} from '@appolo/engine';
import {define} from '@appolo/inject';
import { ObjectSchema } from '@hapi/joi';


@define()
export class ValidatePipe implements IPipeline{
    
    async transform(value:number,context:PipelineContext<{schema:ObjectSchema}>){
      
        const { error } = context.metadata.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
   }
}
export const validate = (schema:ObjectSchema)=> pipe(ValidatePipe,{schema})



@define()
export class SomeClass {
    
    @validate(joi.object().keys({a:joi.string()}))
    test(params:{a:string}){
        return params;
    }
}

injector.get(SomeClass).test({a:11})  //throws BadRequestException

```
