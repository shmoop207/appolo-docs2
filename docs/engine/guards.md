---
id: guards
title: Guards
sidebar_label: Guards
---
Guards  implemented on top of [pipelines](/docs/engine/pipeline)  have a single responsibility to check if a method can be activated.
guard pipeline must implement the `IGuard` interface.
>if the guard decorate a class it will run on all class methods.

## Usage
```typescript
import {guard,IGuard} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class AuthGuard implements IGuard{

   async isValid(context:PipelineContext){
      
        return context.value > context.metadata.max;
   }
}

export const authGuard = (max:number)=> guard(AuthGuard,{max})
```

now lets use out authGuard
```typescript
@define()
export class SomeClass {
    
    @authGuard(5)
    test(value:number){
        return value*value;
    }
}

injector.get<SomeClass>(SomeClass).test(4) 

injector.get<SomeClass>(SomeClass).test(6)  // throw GuardError

```

### Custom Error
you can also throw your own custom error
```typescript
import {guard,IGuard} from '@appolo/engine';
import {define} from '@appolo/inject';

@define()
export class AuthGuard implements IPipeline{
    
    async isValid(context:PipelineContext):Promise<boolean>{
      
        if(context.value > context.metadata.max){
            return true;  
        }
        throw new MyCustomError()

   }
}
```

## Roles Guard example
we assume we a user context on our request
```typescript
import {IGuard,guard,setMetadata,Discovery} from '@appolo/engine';
import {define} from '@appolo/inject';


@define()
export class RolesGuard implements IGuard{

    @inject() discovery:Discovery;

   async isValid(context:PipelineContext){

        let roles  = this.discovery.getReflectMetadata<string[]>("roles",context.type,context.action)
        
        if(!roles){
            return true;
        }   

        let req = context.value,user = req.user;
        
        if(roles.some(role=> user.indexOf(role)>-1)){
            return true
        }
        throw new UnauthorizedError();       
   }
}

export const rolesGuard =  guard(RolesGuard)
export const  roles = (roles:string[])=>setMetadata("roles",roles);

```
now we check the controller
 ```typescript
  
 @controller()
 @rolesGuard()
 export class SomeController extends Controller{
    
     @get("/some/data")
     @roles("admin")
     public async getData(@req req:IRequest){
         return this.send(this.getModel())
     }
 }
 ```
