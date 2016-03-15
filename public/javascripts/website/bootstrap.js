/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
  'require',
  'angular',
  'app',
  'routes'
], function (require, ng, app) {
  'use strict';
  
  /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */

    app.run(['$location', '$rootScope', '$window', 'AuthService', function ($location, $rootScope, $window, AuthService) {
      
      
      $rootScope.$on('$routeChangeStart', function (event) {
        
        //Redirect if not loggin
        /*if (!AuthService.isLoggedIn() && $location.path() != '/login') {
          event.preventDefault();
          $window.location.href = '/login';
        }*/
      });
      
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title || 'English Forum';
        $rootScope.menu = current.$$route.menu;
        $rootScope.active = 'active';
      });
    }]);
  
  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['app']);
  });
});
