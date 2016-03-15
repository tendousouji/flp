/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
  'use strict';
  return app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider.when('/admin/login', {
        controller: 'LoginCtrl',
        title: 'Admin | Home'
      });

      $routeProvider.when('/admin', {
        templateUrl: 'api/admin/partials/post',
        controller: 'HomeCtrl',
        title: 'Admin | Login'
      });

      $routeProvider.when('/admin/posts', {
        templateUrl: 'api/admin/partials/posts',
        controller: 'PostsCtrl',
        title: 'Admin | Created Posts'
      });

      $routeProvider.when('/admin/posts/:id', {
        templateUrl: 'api/admin/partials/post',
        controller: 'PostCtrl',
        title: 'Admin | Edit Post'
      });

      $routeProvider.when('/admin/categories/new', {
        templateUrl: 'api/admin/partials/category',
        controller: 'NewCategoryCtrl',
        title: 'Admin | New Category'
      });

      $routeProvider.when('/admin/categories', {
        templateUrl: 'api/admin/partials/categories',
        controller: 'CategoriesCtrl',
        title: 'Admin | Categories'
      });

      $routeProvider.when('/admin/categories/:id', {
        templateUrl: 'api/admin/partials/category',
        controller: 'EditCategoryCtrl',
        title: 'Admin | Edit Category'
      });

      $routeProvider.when('/admin/groups', {
        templateUrl: 'api/admin/partials/groups',
        controller: 'GroupsCtrl',
        title: 'Admin | Groups'
      });

      $routeProvider.when('/admin/groups/new', {
        templateUrl: 'api/admin/partials/group',
        controller: 'NewGroupCtrl',
        title: 'Admin | New Group'
      });

      $routeProvider.when('/admin/groups/:id', {
        templateUrl: 'api/admin/partials/group',
        controller: 'EditGroupCtrl',
        title: 'Admin | Edit Group'
      });
      
      $routeProvider.otherwise({
        redirectTo: '/admin'
      });
      
      $locationProvider.html5Mode(true);
    }]);
});
