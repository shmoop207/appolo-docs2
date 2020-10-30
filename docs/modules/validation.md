---
id: validator
title: Validator
sidebar_label: Validator
---

You can add validations to any class or method using the `validate` decorator. The method will be called if the validation is valid.<br/>
Validations are using [appolo-validator](https://github.com/shmoop207/appolo-validator  ).<br/>


## Installation
```typescript
npm i @appolo/validator
```

## Options

| key | Description | Type | Default
| --- | --- | --- | --- |
| `convert` | when true, attempts to cast values to the required types (e.g. a string to a number) | `boolean` | `true` |
| `stripUnknown` |  remove unknown elements from objects and arrays| `boolean` | `true` |

in config/modules/all.ts

```typescript
import {App} from 'appolo';
import {ValidationModule} from '@appolo/validator';

export = async function (app:App) {

    app.module.use(ValidationModule.for({
        allowUnknown:true
    }));
}
```
## Usage
### Validate Object
validate with an object will run on the first argument
```typescript
import {controller,Controller,IRequest,IResponse,get,query} from '@appolo/route';
import {inject} from '@appolo/inject';
import {string,validate,number} from '@appolo/validation';

@controller()
export class TestController extends Controller{
    @inject() dataManager:DataManager

    @get("/search/")
    @validate({
        search:string().required(),
        pageSize:number().default(20),
        page:number().default(1)
    })
    public async search (@query() query) {
        let {search,page,pageSize} = query;
        return await this.dataManager.search(search,page,pageSize)
    }
}
```



### Custom Options
custom validate with options

| key | Description | Type | Default
| --- | --- | --- | --- |
| `convert` | when true, attempts to cast values to the required types (e.g. a string to a number) | `boolean` | `true` |
| `stripUnknown` |  remove unknown elements from objects and arrays| `boolean` | `true` |
| `groups` |  groups of the validation| `string[]` | `[]` |

```typescript
import {controller,inject,Controller,IRequest,IResponse,get} from 'appolo';
import {validate} from '@appolo/validation';

@controller()
export class TestController extends Controller{
    @inject() dataManager:DataManager

    @get("/search/")
    @validate({
        search:string().required(),
        pageSize:number().default(20),
        page:number().default(1)
    },{stripUnknown:false,groups:["search"]})
    public async search (@query() query) {
        let {search,page,pageSize} = query;
        return await this.dataManager.getSearchResults(search,page,pageSize)
    }
}
```
### Validation Fail
If the params are not valid, `BadRequestError` will return a `400 Bad Request` response with detailed validation errors.
```typescript
{
    status: 400,
    message: "Bad Request",
    error: "userId is required"  
}
```

### Validation Model
you can use the validations as method decorators
```typescript
import {string,number} from '@appolo/validation';

export class SearchModel {
    
    @string().required()
    search: string;

    @number().required()
    pageSize: number

    @number().default(1)
    page: number
}
```

then in the controller
```typescript
import {controller,Controller,IRequest,IResponse,validator,get,query} from '@appolo/route';
import {inject} from '@appolo/inject';
import {validate} from '@appolo/validation';

@controller()
export class TestController extends Controller{

    @inject() dataManager:DataManager

    @get("/search/")
    public async search (@validate() @query() query:SearchModel) {
       let {search,page,pageSize} = query;
       return await this.dataManager.getSearchResults(search,page,pageSize)
    }
}
```
### Custom options
```typescript
import {object,number,string} from '@appolo/validator';

@schema(object().options({stripUnknown:false}))
export class SearchModel {
    
    @string().required()
    search: string;

    @number().required()
    pageSize: number

    @number().default(1)
    page: number
}
```

#### Inherit Model
```typescript
import {string} from '@appolo/validator';

export class BaseSearchModel {
     @string().required()
      search: string;
}

export class SearchModel extends BaseSearchModel{
    
    @number().required()
    pageSize: number

    @number().default(1)
    page: number
}
```

#### Nested Model
nested model can be an object or array
```typescript
import {string,number,param,schema} from '@appolo/validator';

export class SearchModel {
     @string().required()
     search: string;
     
@number().required()
     pageSize: number
     
     @number().default(1)
     page: number
}

export class PageModel{
    
    @object().keys(SearchModel)
    search:SearchModel
    
    @array().items(SearchModel)
    searches:SearchModel[]
    
    @array().items(SearchModel).required()
    searches2:SearchModel[]
}
```

### Custom message
```typescript
import {object,number,string} from '@appolo/validator';

export class SearchModel {
    
    @string({message:"invalid string"}).max(5,{message:"invalid string ${arg0} len"}).required()
    search: string;
}
```

### Groups
when groups defined on a schema or constrain it will only run when validation  called with matched group
```typescript
import {object,number,string} from '@appolo/validator';

export class SearchModel {
    
    @string().max(5,{groups:["test"]}).required().groups(["test2"])
    search: string;
}


@define()
export class TestController{
    
    public async search (@validate({groups:["test"]}) query:SearchModel) {
        ...
    }
}
```

string constrain will run but not max constrain
<!--- 
## Constrains
### String
validate if given value is string
#### transforms
##### decode(options?: IConverterOptions): this;
UrlDecode given value
##### truncate(limit: number, options?: IConverterOptions): this;
truncate with given limit
##### trim(options?: IConverterOptions): this;
trim string 
##### slugify(options?: IConverterOptions): this;
remove invalid url chars
##### sanitize(options?: IConverterOptions): this;
remove non ascii chars
##### replace(searchValue: string | RegExp, replaceValue: string, options?: IConverterOptions): this;
replace string with given searchValue and replaceValue
#### Constrains
##### uuid(options?: IConstraintOptions): this;
check is value is guid
##### url(options?: IConstraintOptions): this;
check is value is valid url
##### uppercase(options?: IConstraintOptions): this;
check is value is uppercase

##### token(options?: IConstraintOptions): this;
check is value is valid token

##### slug(options?: IConstraintOptions): this;
check is value is valid slug

##### size(limit: number | Ref, options?: IConstraintOptions): this;
check is value has valid length

##### regex(regex: RegExp, options?: IConstraintOptions): this;
check is value match regex

##### numeric(options?: IConstraintOptions): this;
##### mongoId(options?: IConstraintOptions): this;
##### min(limit: number, options?: IConstraintOptions): this;
##### md5(options?: IConstraintOptions): this;
##### max(limit: number, options?: IConstraintOptions): this;
##### lowercase(options?: IConstraintOptions): this;
##### jwt(options?: IConstraintOptions): this;
##### json(options?: IConstraintOptions): this;
##### isoDate(options?: IConstraintOptions): this;
##### ip(options?: IConstraintOptions): this;
##### hexadecimal(options?: IConstraintOptions): this;
##### hash(type: "md5" | "md4" | "sha1" | "sha256" | "sha384" | "sha512", options?: IConstraintOptions): this;
##### enum(enumType: any, options?: IConstraintOptions): this;
##### email(options?: IConstraintOptions): this;
##### domain(options?: IConstraintOptions): this;
##### contains(value: string, options?: IConstraintOptions): this;
##### base64(options?: IConstraintOptions): this;
##### ascii(options?: IConstraintOptions): this;
##### alpha(options?: IConstraintOptions): this;
##### alphanum(options?: IConstraintOptions): this;
--->
