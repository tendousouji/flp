define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('ListPostCtrl', ['$rootScope', '$routeParams', '$scope', 'PostService', 'CataloryService', function ($rootScope, $routeParams, $scope, PostService, CataloryService) {
      var populates = {
        post: ['author'],
      };
      
      var conditions = {
        group: { slug: $routeParams.group_slug },
        catalory: { slug: $routeParams.catalory_slug }
      };
      
      PostService.find(conditions, populates).then(function (posts) {
        $scope.posts = posts;
        console.log(posts);
      });
      
      CataloryService.find({}, { catalory: { slug: $routeParams.catalory_slug } }, {}).then(function (catalories) {
        $scope.catalory = catalories[0] || {};
      });

      console.log($scope);
    }]);
});
