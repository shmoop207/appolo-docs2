---
id: view
title: View
sidebar_label: View
---
appolo view module
## Installation
the view engine must be installed in  `package.json` in the example `npm i nunjucks`.

```typescript
npm i @appolo/view
npm i nunjucks
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `viewFolder` | view folder to search the view paths | `string`|  `views`|
| `viewCache` | cache the compiled views | `boolean` | `true` |
| `viewExt` | views files extension | `string` | `html` |
| `viewEngine` | the view engine to be used from [list](https://github.com/tj/consolidate.js)| `string` | `nunjucks` |
| `maxPathCache` | max number of cached view paths | `number` | `1000` |

in config/modules/all.ts

```typescript
import {App} from '@appolo/core';
import {ViewModule,ViewEngines} from '@appolo/view';

export = async function (app:App) {

    app.module.use(ViewModule.for({
        viewEngine:ViewEngines.nunjucks
    }));
}
```

## Usage

now you can use the res.render function in the controller
```typescript
import {controller, IResponse, get, StaticController} from '@appolo/route';

@controller()
export class ViewController extends StaticController {

    @get("/test/view")
    async someView(req, res: IResponse, route) {
        await res.render("path to view", {test: req.query.test})
    }
}

```

if the path is not defined the view will be searched in the same folder as the controller and file name as the action in the example below it will search for `view2.html`
```typescript
import {controller, IResponse, get, StaticController} from '@appolo/route';

@controller()
export class ViewController extends StaticController {

    @get("/test/view2")
    async view2(req, res: IResponse, route) {
        await res.render( {test: req.query.test})
    }
}
```

the view can be rendered with `view` decorator
```typescript
import {controller, IResponse, get, StaticController} from '@appolo/route';
import {view} from '@appolo/view';


@controller()
export class ViewController extends StaticController {

    @get("/test/view2")
    @view("some path")
    view(req, res: IResponse, route) {
       return {test: req.query.test}
    }
}
```
promises also supported
```typescript
import {controller, IResponse, get, StaticController} from '@appolo/injetc';
import {view} from '@appolo/view';

@controller()
export class ViewController extends StaticController {

    @get("/test/view2")
    @view()
    async view(req, res: IResponse, route) {
       let result  = await doSomeThingAsync();
       return result
    }
}
```

