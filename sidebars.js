module.exports = {
  root: {
    Overview: ['overview/introduction','overview/architecture', "overview/getting-started", "overview/benchmarks", "overview/examples"],
    Configuration: ["configuration/options","configuration/directory-structure","configuration/environments","configuration/middlewares","configuration/modules"],
    Core: ['core/create-app','core/app','core/tree','core/modules','core/discovery'],
    Engine: ['engine/modules','engine/pipeline','engine/bootstrap'],
    Inject: ['inject/dependency-injection','inject/injector','inject/define','inject/inject-constructor','inject/inject-property','inject/singleton','inject/alias','inject/init','inject/factory','inject/lazy'],
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
