"use strict";



;define('library-app/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
;define('library-app/app', ['exports', 'library-app/resolver', 'ember-load-initializers', 'library-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('library-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('library-app/controllers/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      //Delete record from FireBase DB
      unsubscribe(subscriber) {
        this.store.findRecord('subscriber', subscriber.id).then(record => {
          record.destroyRecord();
        });
      }
    }
  });
});
;define('library-app/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    responseMessage: '',
    isSuccess: false,
    emailAddress: '',

    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isDisabled: Ember.computed.not('isValid'),

    actions: {
      saveInvitation() {
        //Show message while loading (It could be useless because DB save operation is quick enough)
        this.set('isSuccess', false);
        this.set('responseMessage', `Saving of the following email address is in progress: ${this.get('emailAddress')}`);
        this.set('emailAddress', this.get('emailAddress'));
        const newSubscriber = this.store.createRecord('subscriber', {
          email: this.get('emailAddress')
        });
        newSubscriber.save().then(() => {
          //Wait for DB save, then - show message
          this.set('isSuccess', true);
          this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
          this.set('emailAddress', '');
          setTimeout(() => {
            this.set('responseMessage', '');
          }, 4000);
        });
      }
    }

  });
});
;define('library-app/helpers/app-version', ['exports', 'library-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('library-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('library-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('library-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'library-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('library-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('library-app/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
;define('library-app/initializers/export-application-global', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define("library-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
;define('library-app/models/subscriber', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr('string')
  });
});
;define('library-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('library-app/router', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('about');
  });

  exports.default = Router;
});
;define('library-app/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function () {
      return this.store.findAll('subscriber');
    }
  });
});
;define('library-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define('library-app/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
;define('library-app/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
;define("library-app/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0iy7mc5K", "block": "{\"symbols\":[\"subscriber\"],\"statements\":[[7,\"h1\"],[9],[0,\"About Page\"],[10],[0,\"\\n\"],[7,\"p\"],[9],[0,\"The list of people who had already subscribed\"],[10],[0,\"\\n\"],[7,\"ul\"],[11,\"class\",\"list-group\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[1,[22,1,[\"email\"]],false],[0,\" \"],[7,\"span\"],[11,\"class\",\"badge cursor-pointer\"],[3,\"action\",[[22,0,[]],\"unsubscribe\",[22,1,[]]]],[9],[0,\"unsubsribe\"],[10],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
;define("library-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U6C3FW7S", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[15,\"navbar\",[]],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
;define("library-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RYLZA8pq", "block": "{\"symbols\":[],\"statements\":[[2,\" app/templates/index.hbs \"],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"jumbotron text-center\"],[9],[0,\"\\n   \"],[7,\"h1\"],[9],[0,\"Coming Soon\"],[10],[0,\"\\n\\n   \"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\n   \"],[7,\"p\"],[9],[0,\"Don't miss our launch date, request an invitation now.\"],[10],[0,\"\\n\\n   \"],[7,\"div\"],[11,\"class\",\"form-horizontal form-group form-group-lg row\"],[9],[0,\"\\n     \"],[7,\"div\"],[11,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2\"],[9],[0,\"\\n       \"],[1,[27,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"email\",[23,[\"emailAddress\"]],\"form-control\",\"Please type your e-mail address.\",\"autofocus\"]]],false],[0,\"\\n     \"],[10],[0,\"\\n     \"],[7,\"div\"],[11,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3\"],[9],[0,\"\\n       \"],[7,\"button\"],[11,\"class\",\"btn btn-primary btn-lg btn-block\"],[12,\"disabled\",[21,\"isDisabled\"]],[3,\"action\",[[22,0,[]],\"saveInvitation\"]],[9],[0,\"Request invitation\"],[10],[0,\"\\n     \"],[10],[0,\"\\n   \"],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"responseMessage\"]]],null,{\"statements\":[[0,\"     \"],[7,\"div\"],[12,\"class\",[28,[[27,\"if\",[[23,[\"isSuccess\"]],\"alert alert-success\",\"alert alert-info\"],null]]]],[9],[1,[21,\"responseMessage\"],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n   \"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
;define("library-app/templates/navbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KTsUhjbL", "block": "{\"symbols\":[],\"statements\":[[7,\"nav\"],[11,\"class\",\"navbar navbar-inverse\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"navbar-header\"],[9],[0,\"\\n      \"],[7,\"button\"],[11,\"class\",\"navbar-toggle collapsed\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#main-navbar\"],[11,\"type\",\"button\"],[9],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"sr-only\"],[9],[0,\"Toggle navigation\"],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Library App\"]],\"parameters\":[]},null],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"collapse navbar-collapse\"],[11,\"id\",\"main-navbar\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav\"],[9],[0,\"\\n            \"],[4,\"link-to\",[\"index\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"Home\"],[10]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"about\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"About\"],[10]],\"parameters\":[]},null],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[10],[2,\" /.container-fluid \"],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/navbar.hbs" } });
});
;define('library-app/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
;

;define('library-app/config/environment', [], function() {
  var prefix = 'library-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("library-app/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"name":"library-app","version":"0.0.0+b4858c76"});
          }
        
//# sourceMappingURL=library-app.map
