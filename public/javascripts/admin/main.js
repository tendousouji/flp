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
    'ng-file-upload': '/libs/ng-file-upload/dist/ng-file-upload.min',
    'angular-sanitize': '/libs/angular-sanitize/angular-sanitize.min',
    'angular-cookies': '/libs/angular-cookies/angular-cookies.min',
    'angular-ckeditor': '/libs/angular-ckeditor/angular-ckeditor.min',
    'ckeditor': '/libs/ckeditor/ckeditor',
    'angular-md5' : '/libs/angular-md5/angular-md5.min',
    'ng-table': '/libs/ng-table/dist/ng-table.min',
    'angular-flash-alert': '/libs/angular-flash-alert/dist/angular-flash.min'
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
    'jquery': {
      exports: 'jquery',
      deps: ['angular']
    },
    'bt': {
      exports: 'bt',
      deps: ['jquery']
    },
    'ng-file-upload': {
      exports: 'ng-file-upload',
      deps: ['angular']
    }, 
    'ckeditor': {
      exports: 'ckeditor',
      deps: ['angular']
    },
    'angular-ckeditor': {
      exports: 'angular-ckeditor',
      deps: ['angular', 'ckeditor']
    },
    'angular-sanitize': {
      exports: 'angular-sanitize',
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
    'ng-table': {
      exports: 'ng-table',
      deps: ['angular']
    },
    'angular-flash-alert': {
      exports: 'angular-flash-alert',
      deps: ['angular']
    }
  },
  
  deps: [
        // kick start application... see bootstrap.js
    './bootstrap'
  ]
});
