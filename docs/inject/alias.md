---
id: alias
title: Alias
sidebar_label: "Alias"
---

You can add alias names to classes and get all the classes instances by alias name as an array or dictionary.

You can multi alias names to a single class.

## Alias Singleton
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Class%20Decorator-blue?style=for-the-badge" /> <img class="decorator-badge" src="https://img.shields.io/badge/Type-Property%20Decorator-orange?style=for-the-badge" />

All the alias classes must be `singleton`.

```typescript
interface IMailProvider{
    send()
}

@define()
@singleton()
@alias('IMailProvider')
export class AwsMailProvider implements IMailProvider {
    send(){}
}
@define()
@singleton()
@alias('IMailProvider')
export class GoogleMailProvider implements IMailProvider{
     send(){}
}

@define()
class SomeController{
    @alias('IHandler') mailProviders:IMailProvider[]

     send(){
        return this.mailProviders.forEach(provider =>provider.send())
    }
}

```
Inject alias by a dictionary.
```typescript
@define()
@singleton()
@alias('IMailProvider')
export class AwsMailProvider implements IMailProvider {
    public Type = "aws" 
    send(){}
}
@define()
@singleton()
@alias('IMailProvider')
export class GoogleMailProvider implements IMailProvider{
    public Type = "google" 
    send(){}
}

@define()
class SomeController{
    @alias('IMailProvider','Type') mailProviders:{[index:string]:IMailProvider}

    public send(providerType:string){
        return this.mailProviders[providerType].send()
    }
}
```

## Alias Factory
<img class="decorator-badge" src="https://img.shields.io/badge/Type-Class%20Decorator-blue?style=for-the-badge" /> <img class="decorator-badge" src="https://img.shields.io/badge/Type-Property%20Decorator-orange?style=for-the-badge" />

You can add alias factory names to classes and get all the classes new instance by factory method.

```typescript
interface IMailProvider{
    send()
}

@define()
@aliasFactory('IMailProvider')
class AwsMailProvider implements IMailProvider{
    constructor (private from:string) {  }
    send() {...}
}
@define()
@aliasFactory('IMailProvider')
class GoogleMailProvider implements IMailProvider{
    
    constructor (private from:string) {  }
    send() {...}}

@define()
class SomeController{
    @aliasFactory('IMailProvider') mailProviders:((name:string)=>IMailProvider)[]

    send(from:string){
        return this.mailProviders.forEach(createHandler =>createHandler(from).send());
    }
}
```

Inject alias Factory by a dictionary.

we need to set indexBy property to be static.
```typescript

@define()
@aliasFactory('IMailProvider')
export class AwsMailProvider implements IMailProvider {
    public static Type = "aws" 
    send(){}
}
@define()
@aliasFactory('IMailProvider')
export class GoogleMailProvider implements IMailProvider{
    public static Type = "google" 
    send(){}
}

@define()
class SomeController{
    @aliasFactory('IMailProvider','Type') mailProviders:{[index:string]:(from:string)=>IMailProvider}

    public send(providerType:string,from:string){
        return this.mailProviders[providerType](from).send()
    }
}
```
