define(['./module'], function (services) {
  'use strict';
  
  services.factory('MainService', ['$http', function ($http) {
      return {
        // admin authentication
        adminAuth: function(data){
          return $http.post('/api/admin/login', data).then(function (result) {
              return result.data;
          });
        },

        // categories
        getCategories: function(){
          return $http.post('/api/admin/catalory/getCategories').then(function (result) {
            return result.data;
          });
        },

        getCategoriesWithGroup: function(){
          return $http.post('/api/admin/catalory/getCategoriesWithGroup').then(function (result) {
            return result.data;
          });
        },

        getCategoyById: function(data){
          return $http.post('/api/admin/catalory/getCategoyById', data).then(function (result) {
            return result.data;
          });
        },

        insertCategory: function(data){
          return $http.post('/api/admin/catalory/insert', data).then(function (result) {
            return result.data;
          });
        },

        updateCategory: function(data){
          return $http.post('/api/admin/catalory/update', data).then(function (result) {
            return result.data;
          });
        },

        // types
        getTypes: function(){
          return $http.post('/api/admin/type/getTypes').then(function(result){
            return result.data;
          });
        },

        // groups
        getGroups: function(){
          return $http.post('/api/admin/group/getGroups').then(function(result){
            return result.data;
          });
        },

        getGroupById: function(data){
          return $http.post('/api/admin/group/getGroupById', data).then(function (result) {
            return result.data;
          });
        },

        insertGroup: function(data){
          return $http.post('/api/admin/group/insert', data).then(function (result) {
            return result.data;
          });
        },

        updateGroup: function(data){
          return $http.post('/api/admin/group/update', data).then(function (result) {
            return result.data;
          });
        },

        // posts
        insertPost: function(data){
          return $http.post('/api/admin/post/insert', data).then(function (result) {
            return result.data;
          });
        },

        updatePost: function(data){
          return $http.post('/api/admin/post/update', data).then(function (result) {
            return result.data;
          });
        },

        removePost: function(data){
          return $http.post('/api/admin/post/remove', data).then(function (result) {
            return result.data;
          });
        },

        getPosts: function(){
          return $http.post('/api/admin/post/getPosts').then(function (result) {
            return result.data;
          });
        },

        getPostById: function(data){
          return $http.post('/api/admin/post/getPostById', data).then(function (result) {
            return result.data;
          });
        },

        // authors
        getAuthors: function(){
          return $http.post('/api/admin/user/getAuthors').then(function (result) {
            return result.data;
          });
        },

        friendlyUrl: function(item){
          if (item) {
            var str = item.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
            str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
            str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
            str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
            str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
            str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
            str = str.replace(/(đ)/g, 'd');
            str = str.replace(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, 'A');
            str = str.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, 'E');
            str = str.replace(/(Ì|Í|Ị|Ỉ|Ĩ)/g, 'I');
            str = str.replace(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, 'O');
            str = str.replace(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, 'U');
            str = str.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, 'Y');
            str = str.replace(/(Đ)/g, 'D');
            str = str.replace(/[^A-Za-z0-9 ]/, '');
            str = str.replace(/\s+/g, ' ');
            str = str.trim();
            str = str.toLowerCase();
            str = str.replace(/\s/g, '-');
            return str;
          }
        }
      }
    }]);
});