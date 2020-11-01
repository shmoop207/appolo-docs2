module.exports = {
  root: {
    Overview: ['overview/introduction', 'overview/architecture', "overview/getting-started", "overview/benchmarks", "overview/examples"],
    Configuration: ["configuration/options", "configuration/directory-structure", "configuration/environments", "configuration/middlewares", "configuration/modules"],
    Route: ['route/controllers', 'route/actions', 'route/routes', 'route/middlewares', 'route/hooks', 'route/errors', 'route/IRequest', 'route/IResponse'],
    Engine: ['engine/modules', 'engine/pipeline', 'engine/guards', 'engine/interceptors', 'engine/pipes', 'engine/exceptions', 'engine/bootstrap'],
    Modules: ['modules/logger', 'modules/view', 'modules/validator', 'modules/cache', 'modules/bus', 'modules/context', 'modules/http', 'modules/mongo', 'modules/redis', 'modules/socket', 'modules/typeorm','modules/pubsub','modules/queue','modules/cqrs'],
    Inject: ['inject/dependency-injection', 'inject/injector', 'inject/define', 'inject/inject-constructor', 'inject/inject-property', 'inject/singleton', 'inject/alias', 'inject/init', 'inject/factory', 'inject/lazy'],
    Core: ['core/create-app', 'core/app', 'core/tree', 'core/modules', 'core/route', 'core/discovery', "core/events"],
    Utils: ['utils/event-dispatcher', 'utils/helpers'],
  }
};
