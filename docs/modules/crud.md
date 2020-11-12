---
id: crud
title: Crud
sidebar_label: Crud
---
Crud module automatically generate create update get delete methods on given controller

## Installation

```typescript
npm i @appolo/crud
```


in config/modules/all.ts

```typescript
import {Crud} from '@appolo/crud';

export = async function (app: App) {
    app.module.use( Crud);
    
}
```

## Usage
create a controller with given entity and inject handle manager that implements `IBaseCrudManager`
```typescript
import {CrudController,crud} from '@appolo/crud';

@controller("/test")
@crud({model: Test})
export class TestController extends CrudController<Test> {
   @inject(TestManager) manager: TestManager

}
```

now define the entity
```typescript
export class Test {

    @string().optional().groups([ValidateGroups.Update])
    id: string;

    @string().optional()
    name: string;

    @boolean().required().groups([ValidateGroups.Update])
    isActive: boolean;
}
```

this will create the following end points
* GET `/test/` - get all entities
* GET `/test/:id` - get one entity
* POST `/test/` - create entity
* PATCH `/test/:id` - update entity
* DELETE `/test/:id` - delete entity
* PATCH `/test/:id/active` - active entity


