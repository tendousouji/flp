define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('CategoriesCtrl', ['$scope', '$routeParams', '$location', '$cookieStore', 'MainService', function ($scope, $routeParams, $location, $cookieStore, MainService) {
      var user = $cookieStore.get('user') || null;

      if(!user){
        $window.location.href = '/admin/login';
      }
      else{
        $scope.title = 'Categories';

        // get categories filter data
        MainService.getCategoriesWithGroup().then(function (categories){
          $scope.categories = categories;
        });
      }
    }]);
});
