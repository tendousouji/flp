define(['./module'], function (controllers) {
    'use strict';
  controllers.controller('BaseCtrl', ['$scope','PostService', 'CataloryService',function ($scope, PostService, CataloryService) {
      CataloryService.topCatalories().then(function (catalories) {
        $scope.topCatalories = catalories;
      });
      PostService.topPosts().then(function (posts) {
        $scope.topPosts = posts;
      });
    }]);
});
