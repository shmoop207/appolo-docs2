---
id: directory-structure
title: Directory Structure
sidebar_label: Directory Structure
---

 Appolo will require all files in `options.path default` to  `[src]` folders All other folders are optional

```bash
root-directory

├── config
│    ├── env
│    │   ├── all.ts
│    │   ├── development.ts
│    │   └── production.ts
│    ├── middlewares
│    │   ├── all.ts
│    │   └── development.ts
│    └── modules
│        ├── all.ts
│        └── development.ts
├── src
│   ├── controllers
│   ├── managers
│   ├── services
│   └── bootstrap.ts
└── app.ts

```