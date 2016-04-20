/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
  'use strict';
  return app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider.when('/login', {
        templateUrl: 'api/partials/login',
        controller: 'LoginCtrl',
        title: 'Login'
      });

      $routeProvider.when('/AssessmentTool', {
        templateUrl: 'api/partials/assessment_tool',
        controller: '',
        title: 'assessment_tool'
      });

      $routeProvider.when('/Confirm/:id', {
        templateUrl: 'api/partials/confirm',
        controller: 'RegisterCtrl',
        title: 'Confirm'
      });
      
      $routeProvider.when('/:group_slug', {
        templateUrl: 'api/partials/list_catalory',
        controller: 'ListCataloryCtrl',
        title: 'ListCatalory'
      });
      
      $routeProvider.when('/:group_slug/:catalory_slug', {
        templateUrl: 'api/partials/list_post',
        controller: 'ListPostCtrl',
        title: 'ListPost'
      });
      
      $routeProvider.when('/:group_slug/:catalory_slug/:post_slug', {
        templateUrl: 'api/partials/post',
        controller: 'PostCtrl',
        title: 'Post'
      });
      
      $routeProvider.when('/', {
        templateUrl: 'api/partials/home',
        controller: 'HomeCtrl',
        title: 'Home'
      });
      
      $routeProvider.otherwise({
        redirectTo: '/'
      });
      
      $locationProvider.html5Mode(true);
    }]);
});
