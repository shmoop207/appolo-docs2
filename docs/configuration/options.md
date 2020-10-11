---
id: options
title: Options
sidebar_label: Options
---
appolo create configuration options, all options are optional

| key | Description | Type | Default
| --- | --- | --- | --- |
| `paths` | folders that will be required and loaded on appolo launch | `array`|  `[ 'src']`|
| `root` | the root folder of the paths option | `string` | `process.cwd()` |
| `environment` | environment file name that will override the settings in `environments/all.js` | `string` | `(process.env.NODE_ENV or 'development')` |
| `startMessage` | the message that will be written to console log the the server starts | `string` | `'Appolo Server listening on port: {port} version:{version} environment: {environment}'` |
| `startServer` | if true the server will start immediately to listen to port else you will have to start in manually. | `boolean` | `true` |
| `port` | the port that the app will listen to. | `number` | `process.env.PORT or this._options.port or appolo.environment.port or 8080)` |
| `errorMessage` | print route http error.toString() | `boolean` | `true` |
| `errorMessage` | print route http error.stack | `boolean` | `false` |
| `maxRouteCache` | the max size of route lookup lru cache | `number` | `10000` |
|  `qsParser` | function for parsing querystring |`(query:string)=>{[index:string]:any}` | `querystring` |
## Usage
```typescript
import {createApp}  from '@appolo/core';
(async ()=>{
    let app = await createApp({
        paths:[ 'src'],
        root : process.cwd()+'/app',
        environment : 'testing',
        port:8182
     }).launch();
 })();
```
