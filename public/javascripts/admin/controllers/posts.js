define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('PostsCtrl', ['$routeParams', '$scope', '$location', '$cookieStore', 'NgTableParams', 'MainService', function ($routeParams, $scope, $location, $cookieStore, NgTableParams, MainService) {
    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      $scope.title = 'Created Posts';

      // filter data
      var defaultFilter = { id: '', title: 'All' };
      $scope.categories = [defaultFilter];
      $scope.types = [defaultFilter];
      $scope.authors = [defaultFilter];

      // get categories filter data
      MainService.getCategories().then(function(categories){
        categories.forEach(function(category){
          $scope.categories.push({
            id: category.name,
            title: category.name
          })
        });
      });

      // get types filter data
      MainService.getTypes().then(function(types){
        types.forEach(function(type){
          $scope.types.push({
            id: type.name,
            title: type.name
          });
        });
      });

      // get authors filter data
      MainService.getAuthors().then(function(authors){
        authors.forEach(function(author){
          $scope.authors.push({
            id: author.username,
            title: author.username
          });
        });
      });

      // get posts to set to ng-table
      MainService.getPosts().then(function(posts){
        // set addtional filed
        posts.forEach(function(post){
          if (post.author == null || post.catalory == null || post.type == null) {
          } else {
            post.author_name = post.author.username;
            post.category_name = post.catalory.name;
            post.type_name = post.type.name;
          }
        });

        // build ng-table
        $scope.tableParams = new NgTableParams({
          filter:  {category_name: '', type_name: '', author_name: ''},
          page: 1,
          count: 20
        }, {
          filterDelay: 0,
          data: posts
        });
      });
    }
  }]);

});
