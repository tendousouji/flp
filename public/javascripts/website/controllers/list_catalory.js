define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('ListCataloryCtrl', ['$rootScope', '$routeParams', '$scope', 'CataloryService', function ($rootScope, $routeParams, $scope, CataloryService) {
      CataloryService.getByGroup($routeParams.group_slug).then(function (catalories) {
        $scope.catalories = catalories;
        console.log(catalories);
      })
    }]);
});
