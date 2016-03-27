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
        for (var i = catalories.length - 1; i >= 0; i--) {
          if ($routeParams.catalory_slug == catalories[i].slug) {
            $scope.catalory = catalories[i] || {};
          }
        }
      });

      $scope.group = {};
      $scope.group.slug = $routeParams.group_slug;
      console.log("scope_group: ", $scope.group.slug);

    }]);
});
