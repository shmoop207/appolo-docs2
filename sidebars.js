module.exports = {
  root: {
    Overview: ['overview/introduction','overview/architecture', "overview/getting-started", "overview/benchmarks", "overview/examples"],
    Configuration: ["configuration/options","configuration/directory-structure","configuration/environments","configuration/middlewares","configuration/modules"],
    Core: ['core/create-app','core/app','core/tree','core/modules','core/discovery'],
    Engine: ['engine/bootstrap'],
    Utils: ['utils/event-dispatcher','utils/helpers'],
    "API Reference": [
      'container',
      'lifecycle',
      {
        'Core Decorators': ['define', 'singleton', 'bootstrap', 'alias', 'lazy', 'inject', 'injectAlias', 'init']
      },
      'enums',
    ]
  }
};
