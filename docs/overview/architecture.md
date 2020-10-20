---
id: architecture
title: Architecture
sidebar_label: Architecture
slug: /architecture
---

Appolo is build from 8 modules, each of them you can as standalone module .
* [`@appolo/core`](https://github.com/shmoop207/appolo) - Main core module glues eventing together.
* [`@appolo/engine`](https://github.com/shmoop207/appolo-engine) - Loads the app and child modules.
* [`@appolo/route`](https://github.com/shmoop207/appolo-route) - Handles Controllers and Middlewares.
* [`@appolo/agent`](https://github.com/shmoop207/appolo-agent) - Handles incoming http request.
* [`@appolo/router`](https://github.com/shmoop207/appolo-router) - Finds request handlers.
* [`@appolo/router`](https://github.com/shmoop207/appolo-inject) - handles dependency injection.
* [`@appolo/events`](https://github.com/shmoop207/appolo-event-dispatcher) - Handles event dispatching.
* [`@appolo/utils`](https://github.com/shmoop207/appolo-utils) - Utility functions.
<br/><br/>


![architecture](/img/architecture.svg)
