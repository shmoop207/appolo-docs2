---
id: http
title: HTTP Service
sidebar_label: Http
---
http service module  build with [axios](https://github.com/axios/axios)

## Installation

```typescript
npm i @appolo/http
```


in config/modules/all.ts

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | injection id | `string`|  `httpService`|

any option from `Request Config` can be added and will be added to all request.

```typescript
import {HttpModule} from '@appolo/http';

export = async function (app: App) {
    app.module.usage(HttpModule.for({
        baseURL:"https://some-domain.com/api/",
        retry:2
    }));
}
```

## Usage

```typescript
import {define, singleton,inject} from '@appolo/inject'
import {publisher} from "@appolo/http";

@define()
@singleton()
export class SomeManager {

    @inject httpService:HttpService

    async getUserId(): Promise<string> {

        let result = await this.httpService.request<{userId:string}>({
            url:"http://someurl",
            method:"post",
            timeout:1000,
            retry:3
        })

        return result.data.userId
    }
}
```

## Request Config
| key | Description | Type | Default
| --- | --- | --- | --- |
| `url` | `request url | `string`|  ``|
| `method` | is the request method to be used when making the request | `string` | `get` |
| `baseURL` | `baseURL` will be prepended to `url` unless `url` is absolute | `string` | `` |
| `headers` | custom headers  | `object` | `{}` |
| `params` | are the URL parameters to be sent with the request  | `object` | `{}` |
| `data` | the data to be sent as the request body  | `object` | `{}` |
| `timeout` | specifies the number of milliseconds before the request times out  | `number` | `0` |
| `withCredentials` | indicates whether or not cross-site Access-Control requests  | `boolean` | `false` |
| `auth` | indicates that HTTP Basic auth should be used, and supplies credentials  | `object` | `{}` |
| `responseType` | indicates the type of data that the server will respond with | `string` | `json` |
| `responseEncoding` | indicates encoding to use for decoding responses | `string` | `utf8` |
| `maxRedirects` |  defines the maximum number of redirects to follow in node.js | `number` | `5` |
| `retry` | retry  times on requests that return a response (500, etc) before giving up | `number` | `0` |
| `noResponseRetries` |  retry times on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc) | `number` | `0` |
| `retryDelay` |  Milliseconds to delay at first | `number` | `100` |
| `fallbackUrls` |  retry on fallback urls | `string[]` | `[]]` |

