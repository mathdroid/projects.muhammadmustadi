'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('ParallelCtrl', function ($scope) {
    // write Ctrl here
    $scope.init = function () {
      $scope.data = {"parallel": {}};
      $scope.form = {};
      $scope.strings = {};
    }
    $scope.inputArray = function () {
      $scope.data.arraytemp = $scope.form.form1.split(',');
      $scope.data.array1 = [];
      var tempval = null;
      for (var i = 0; i < $scope.data.arraytemp.length; i++) {
        tempval = Math.floor($scope.data.arraytemp[i]);
        if (tempval) {
          $scope.data.array1.push(tempval);
        }
      }

      $scope.data.arraytemp = null;
    }
    $scope.resetArray = function () {
      $scope.data.array1 = [];
    }
    $scope.createParallel = function () {
      console.log('creating parallel variable');
      $scope.data.parallel.p = new Parallel($scope.data.array1);
      console.log($scope.data.parallel.p);
    }

    $scope.init();
  });
