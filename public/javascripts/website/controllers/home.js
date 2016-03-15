define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('HomeCtrl', ['$rootScope', '$route', '$scope', '$location', 'GroupService', 'CataloryService', 'PostService', function ($rootScope, $route, $scope, $location, GroupService, CataloryService, PostService) {
      var populates = {
        post: ['author'],
        catalory: [],
        group: []
      };
      
      var conditions = {
        group: {},
        catalory: {},
        post: {}
      };
      
      var joins = {
        catalory : "JOIN",
        post: "JOIN"
      }


      $scope.activeId = [];
      $scope.showPost = function(index, group) {
        $scope.activeId[group] = index;
        // $('.category-title').on('click', function(){
        //   $(this).siblings().removeClass('active-category');
        //   $(this).addClass('active-category');
        //   $('.category-content').removeClass('active-category-content');
        //   $('.category-title').each(function(){
        //     if($(this).hasClass('active-category')) {
        //       var id = $(this).index();
        //     $($(this).parent().next().children().eq(id)).addClass('active-category-content');
        //     }
        //   });
        // });
      }

      $scope.scrollTop = function() {
        $('html, body').animate({
          scrollTop: 0
        }, 600);
      }

      GroupService.findJoinChild(conditions, populates, joins).then(function (groups) {
        $scope.groups = groups;
        $scope.topCatalories = CataloryService.findTopCatalory(groups);
        $scope.topPosts = PostService.findTopPost(groups);

        for (var i = groups.length - 1; i >= 0; i--) {
          $scope.activeId.push(0);
        }
        
        // console.log(groups);
        // console.log($scope.topCatalories);
        // console.log($scope.topPosts);
      });

    }]);
});
