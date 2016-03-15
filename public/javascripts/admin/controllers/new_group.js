define(['./module'], function (controllers) {
  'use strict';
    
  controllers.controller('NewGroupCtrl', ['$scope', '$rootScope', '$cookieStore', '$window', '$location', '$timeout', 'Flash', 'Upload', 'MainService',function ($scope, $rootScope, $cookieStore, $window, $location, $timeout, Flash, Upload, MainService) {

    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      $scope.title = 'New Group';
      $scope.actionLabel = 'Create';

      // init group
      $scope.group = {};
      $scope.group.is_active = 1;

      $scope.actionGroup = function(){
        $scope.group.slug = MainService.friendlyUrl($scope.group.name);

        MainService.insertGroup($scope.group).then(function (group){
          if(group){
            $scope.group = {};
            $scope.group.is_active = 1;

            Flash.create('success', 'Create new group successfully.');
          }
          else{
            Flash.create('danger', 'Create new group unsuccessfully.');
          }
        });
      }
    }
  }]);
});
