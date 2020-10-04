module.exports = {
  root: {
    Overview: ['overview/introduction', "overview/getting-started", "overview/benchmarks", "overview/examples"],
    Configuration: ["configuration/options","configuration/environments","configuration/directory-structure","configuration/middlewares"],
    Plugins: ['plugins', 'env-plugin', 'express-plugin'],
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
