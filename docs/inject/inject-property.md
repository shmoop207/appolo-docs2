---
id: inject-property
title: "Inject Property"
sidebar_label: "Inject Property"
---

`@inject` will try to inject object id to the same property name.
```typescript
@define()
@singleton()
class FooManager{
    get name () { return 'foo' }
}
@define()
@singleton()
class BarManager{
    get name () { return 'bar' }
}

@define()
class BuzzController{
    @inject() fooManager:FooManager;
    @inject() barManager:BarManager;

    get name () { return this.fooManager.name + this.barManager.name }
}

let buzzController = injector.get<BuzzController>(BuzzController);
console.log(buzzController.name) // foobar
```

## Inject Instance By Name
you can set the name of the property the object will be injected to.
```typescript
@define()
@singleton()
class FooManager{
    get name() {return 'foo'}
}
@define()
@singleton()
class BarManager{
    get name() { return 'bar'}
}
@deine()
class BuzzController{
    @inject(FooManager) foo:FooManager;
    @inject('barManager') bar:BarManager;

    get name () { return this.foo.name + this.bar.name}
 }

let buzzController = injector.get('buzzController');
console.log(buzzController.name) // foobar
```

## Inject Property Value
```typescript
@define()
class FooManager{
    @injectValue('foo') name:string
    get name () {return this.name;}
 }

@define()
class BuzzController{
    @inject(FooManager) foo:FooManager;

    get name () { return this.foo.name}
}

let buzzController = injector.get('buzzController');
console.log(buzzController.name()) // foo
```

## Inject Method Param
you can inject an instance to method param to any function.
```typescript
@define()
class FooManager{
    get name () {return "foo"}
}

@define()
class BuzzController{
    public name (@inject(FooManager) foo:FooManager) {
        return this.foo.name
    }
}

let buzzController = injector.get('buzzController');
console.log(buzzController.name()) // foo
```

## Inject Factory Method
factory method is a function that will return the injected object.
this is useful to create many instances of the same class.
```typescript
@define()
class  Person{
    constructor (name) {
        this.name = name;
    }
    get name(){return this.name; }
}
@define()
class FooController{
    @factoryMethod(Person) createPerson:(name)=>Person
    name () { return this.createPerson('foo').name; }
}

let fooController = injector.get(FooController);
console.log(fooController.name) // foo
```

if  the instance has async initialize you can use `factoryMethodAsync`

```typescript
@define()
class  Person{
    constructor (name) {
        this.name = name;
    }
    @initAsync()
    async init(){
        //do something async
    }   
    get name(){return this.name; }
}
@define()
class FooController{
    @factoryMethodAsync(Person) createPerson:(name)=>Promise<Person>
    
    async name () {  
        let person = await this.createPerson('foo'); 
        return person.name;
    }
}
...
let fooController = await injector.getAsync(FooController);
console.log(fooController.name) // foo
```


## Inject Property Array
you can inject an array of properties by reference or by value.

```typescript
@define()
@singleton()
class FooManager{
    get name () { return 'foo' }
 }

@define()
@singleton()
class BarManager{
    get name () {return 'bar'}
}
@define()
class BuzzController{
    @array([FooManager,BarManager]) objects:any[]

    name () { this.objects.map(obj=>obj.name).join() }
}

var buzzController = injector.get(BuzzController);
buzzController.name // foobar

```

## Inject Property Dictionary
you can inject a dictionary of properties by reference or by value.

```typescript
@define()
@singleton()
class FooManager{
	get name () { return 'foo' }
 }

@define()
@singleton()
class BarManager{
	get name () {return 'bar'}
}
@define()
class BuzzController{
    @dictionary({foo:FooManager,bar:BarManager}) objects:any[]
    get name () {return this.objects.foo.name + this.objects.bar.name + this.objects.baz;}
}

var buzzController = injector.get(BuzzController);
buzzController.name // foobarbaz

```
## Inject Property From Object Property
you can inject property from other object property.
```typescript
@define()
@singleton()
class FooManager{
	public name =  'foo';
}
@define()
class BuzzController{
    @objectProperty(FooManager,'name') otherObjectProperty

    name () {return return this.otherObjectProperty;}
}

let buzzController = injector.get(BuzzController);
buzzController.name() // foo
```
