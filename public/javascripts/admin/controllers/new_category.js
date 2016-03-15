define(['./module'], function (controllers) {
  'use strict';
    
  controllers.controller('NewCategoryCtrl', ['$scope', '$rootScope', '$cookieStore', '$window', '$location', '$timeout', 'Flash', 'Upload', 'MainService',function ($scope, $rootScope, $cookieStore, $window, $location, $timeout, Flash, Upload, MainService) {

    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      $scope.title = 'New Category';
      $scope.actionLabel = 'Create';

      // init category
      $scope.category = {};
      $scope.category.is_active = 1;

      MainService.getGroups().then(function (groups) {
        $scope.groups = groups;
        $scope.selectedGroup = {
          _id: groups[0]._id
        };
      });

      $scope.actionCategory = function(){
        $scope.category.slug = MainService.friendlyUrl($scope.category.name);
        $scope.category.group_id = $scope.selectedGroup._id;

        MainService.insertCategory($scope.category).then(function (category){
          if(category){
            $scope.category = {};
            $scope.category.is_active = 1;

            Flash.create('success', 'Create new category successfully.');
          }
          else{
            Flash.create('danger', 'Create new category unsuccessfully.');
          }
        });
      }
    }
  }]);
});
