define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('GroupsCtrl', ['$scope', '$routeParams', '$location', '$cookieStore', 'MainService', function ($scope, $routeParams, $location, $cookieStore, MainService) {
      var user = $cookieStore.get('user') || null;

      if(!user){
        $window.location.href = '/admin/login';
      }
      else{
        $scope.title = 'Groups';

        // get groups
        MainService.getGroups().then(function (groups){
          $scope.groups = groups;
          console.log($scope.groups);
        });
        
      }
    }]);
});
