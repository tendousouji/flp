define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('PostCtrl', ['$rootScope', '$routeParams', '$scope', 'PostService', function ($rootScope, $routeParams, $scope, PostService) {
      var populates = {
        post: ['author', 'type' , 'comments.user', 'tags', 'catalory'],
        catalory: ['group']
      };
      
      var conditions = {
        group: { slug: $routeParams.group_slug },
        catalory: { slug: $routeParams.catalory_slug },
        post: { slug: $routeParams.post_slug }
      };
      
      PostService.find(conditions, populates).then(function (post) {
        $scope.post = post[0];
        console.log(post);
      });

      $scope.comment = function () {
        PostService.comment({ user_id: $scope.post[0].author._id, content: 'test comment' }, $scope.post[0]._id).then(function (data) { 
          console.log(data);
        });
      }
    }]);
});
