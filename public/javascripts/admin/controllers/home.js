define(['./module'], function (controllers) {
  'use strict';
    
  controllers.controller('HomeCtrl', ['$scope', '$rootScope', '$cookieStore', '$window', '$location', '$timeout', 'Flash', 'Upload', 'MainService',function ($scope, $rootScope, $cookieStore, $window, $location, $timeout, Flash, Upload, MainService) {

    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      // set admin name
      $rootScope.admin_name = user.username;

      // post init
      $scope.post = {};

      // set default lable
      $scope.pageTitle = 'New Post';
      $scope.actionBtnText = 'Create';

      // ck-editor options
      $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
      };
    
      // Called when the editor is completely ready.
      $scope.onReady = function () {}

      // get categories for select
      MainService.getCategories().then(function (categories){
        $scope.categories = categories;
        $scope.selectedCategory = {
          _id: categories[0]._id
        };
      });

      // get types for select
      MainService.getTypes().then(function (types){
        $scope.types = types;
        $scope.selectedType = {
          _id: types[0]._id
        };
      });

      // upload cover image handle
      $scope.onUpdateThumb = function ($files){
        if($files){
          Upload.upload({
            url: '/api/uploads',
            method: 'POST',
            withCredentials: true,
            file: $files[0]
          }).success(function(data, status, headers, config) {
            $scope.post.image_url = data;
          });
        }
      };

      // ck-editor insert image handle
      $scope.onAddImages = function ($files){
          Upload.upload({
            url: '/api/uploads',
            method: 'POST',
            withCredentials: true,
            file: $files[0]
          }).success(function(data, status, headers, config) {
            $scope.htmlEditor += '<img alt="" src="' + data + '" />';
          });
      };

      // create post
      $scope.action = function () {
        $scope.post.author_id = user._id;
        $scope.post.content = $scope.htmlEditor;
        $scope.post.slug = MainService.friendlyUrl($scope.post.title);
        $scope.post.type_id = $scope.selectedType._id;
        $scope.post.category_id = $scope.selectedCategory._id;

        MainService.insertPost($scope.post).then( function(post) {
          if(post){
            $scope.post = {};
            $scope.htmlEditor = '';

            Flash.create('success', 'Create new post successfully.');
          }
          else{
            Flash.create('danger', 'Create new post unsuccessfully.');
          }
        });
      };

      // ck-editor insert image custom action
      $timeout(function () {
        $('#cke_72').click(function (){
          $timeout(function(){
            $('#cke_206_uiElement')[0].click();
            $('#image_add')[0].click();
          }, 250);
        });
      }, 250);
    }

    // logout handle
    $rootScope.logout = function (){
      $cookieStore.remove('user');
      $window.location.href = '/admin/login';
    }

  }]);
});
