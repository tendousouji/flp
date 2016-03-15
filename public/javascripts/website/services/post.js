define(['./module'], function (services) {
  'use strict';
  
  services.factory('PostService', ['$http', function ($http) {
      return {
        find: function (conditions, populates) {
          return $http.post('/api/post/find', { conditions : conditions, populates: populates }).then(function (result) {
            return result.data;
          });
        }, 
        comment: function (comment, post_id) {
          return $http.post('/api/post/insertComment', { comment : comment, post: { id: post_id } }).then(function (result) {
            return result.data;
          });
        },
        topPosts: function (){
          return $http.post('/api/post/top').then(function (result) {
            return result.data;
          });
        },
        findTopPost: function (groups){
          var posts = [];

          for (var i in groups) {
            for (var j in groups[i].catalories) {
              for (var k in groups[i].catalories[j].posts) {
                posts.push(groups[i].catalories[j].posts[k]);
              }
            }
          }

          //sort
          posts.sort(function (a, b) { return b.likes.length - a.likes.length });
          return posts;
        }
      }
    }]);
});
