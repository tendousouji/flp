/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
  'angular',
  'angular-route',
  'ng-file-upload',
  'angular-sanitize',
  'angular-cookies',
  'angular-ckeditor',
  'angular-flash-alert',
  'ng-table',
  'angular-md5',
  'ckeditor',
  'jquery',
  'bt',
  './controllers/index',
  './directives/index',
  './filters/index',
  './services/index'
], function (angular) {
  'use strict';
  return angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services',
    'angular-md5',
    'ngTable',
    'flash'
  ]);
});
