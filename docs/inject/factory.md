---
id: factory
title: Factory
sidebar_label: Factory
---

Factory used to define runtime custom injections. 

## Singleton Factory
The return value of the factory `get` method will be injected to class properties;

Factory object must have implement `IFactory` method that will be called in order to inject the object instance.
the `get` method can return promise;

Factories are singletons and initialized first.

once all the factories loaded, inject initialize process continues

```typescript
@define()
@singleton()
@factory()
class MailProvider implements IFactory<IMailProvider>{
    @inject() googleMailProvider:IMailProvider;
    @inject() awsMailProvider:IMailProvider;
    @inject() env:IEnv;
    
    async get ():Promise<IMailProvider> {
        
        return this.env.mailProvider =="aws" 
            ? this.awsMailProvider 
            : this.googleMailProvider
    }
}
@define()
@singleton()
class AwsMailProvider implements IMailProvider{
     send(){}
}
@define()
@singleton()
class GoogleMailProvider implements IMailProvider{
     send(){}
}
```
now we can use mail factory.
mailProvider provider will be awsMailProvider or googleMailProvider based on our env;

```typescript 
@define()
@singleton()
class SomeController{
    @inject() mailProvider:IMailProvider;
    
    public sendMail(){
        this.mailProvider.send()
    }
 }

```

## Dynamic Factory
dynamic factories can be used when creating not singleton classes

the return value of the factory get method will be injected.

```typescript

@define()
class GoogleMailProvider implements IMailProvider{
    constructor(public from:string) {

    }
    public send(){...}
}
@define()
class AWSMailProvider implements IMailProvider{
    constructor(public from:string) {

    }
    public send(){...}
}

@define()
@dynamicFactory()
class MailProvider{
    
    @factoryMethod(AWSMailProvider) createAWSMailProvider: (from:string)=>IMailProvider;
    @factoryMethod(GoogleMailProvider) createGoogleMailProvider: (from:string)=>IMailProvider;
       
    constructor(private type:string, private from:string) {

    }

    async get(){
        return this.type == "aws" 
            ? this.createAWSMailProvider(this.from) 
            : this.createGoogleMailProvider(this.from)
    }

}

@define()
class SomeController {
    @factoryMethod(MailProvider) createMailProvider: ((type:string,from:string)=>IMailProvider)[];
    
    async send() {
        let mailProvider =   await this.createMailProvider("aws","me")
        return mailProvider.send();
    }
}

 
```
