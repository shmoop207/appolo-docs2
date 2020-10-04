---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /getting-started
---

Appolo is a set of npm packages under the `@appolo` npm scope.

### Requirements

- [Node.js](https://nodejs.org/en/) version >= 12.12.0
- [TypeScript](https://www.typescriptlang.org/) version >= 4.0.0

### Installation

```bash npm
npm install --save @appolo/core
```

### Typescript
`appolo` requires TypeScript compiler version > 2.1 and the following settings in `tsconfig.json`

```typescript
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "target": "es2017",
    "module": "commonjs"
  }
}
```
### Launch
```typescript
var {createApp}  from '@appolo/core';

createApp()
    .get("/some_path",(req,res)=> ({"working":true}))
    .launch();
```
