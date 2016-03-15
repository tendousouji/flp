 /**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({
  
  paths: {
    'angular': '/libs/ng/angular.min',
    'angular-route': '/libs/ng-route/angular-route.min',
    'domReady': '/libs/domready/domReady',
    'jquery': '/javascripts/jquery-2.1.4.min',
    'bt' : '/libs/bootstrap/js/bootstrap.min',
    'angular-cookies' : '/libs/angular-cookies/angular-cookies.min',
    'angular-md5' : '/libs/angular-md5/angular-md5.min'
  },
  
  /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': {
      exports: 'angular-route',
      deps: ['angular']
    },
    'angular-cookies': {
      exports: 'angular-cookies',
      deps: ['angular']
    }, 
    'angular-md5': {
      exports: 'angular-md5',
      deps: ['angular']
    },
    'jquery': {
      exports: 'jquery',
      deps: ['angular']
    },
    'bt': {
      exports: 'bt',
      deps: ['jquery']
    }
  },
  
  deps: [
        // kick start application... see bootstrap.js
    './bootstrap'
  ]
});
