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
  controller('OtherCtrl', function ($scope) {
    // write Ctrl here

  }).
  controller('ParallelCtrl', function ($scope, $interval, $timeout, ngProgress) {
    // write Ctrl here
    $scope.init = function () {
      $scope.data = {"parallel": {}};
      $scope.form = {};
      $scope.strings = {"res3": ''};
      $scope.timer = {};
      $scope.working = {"ex1": false};
      ngProgress.height('5px');
      ngProgress.color('#FF2A2A');
    }
    $scope.inputArray = function () {
      ngProgress.start();
      $scope.data.arraytemp = $scope.form.form1.split(',');
      if($scope.data.array1==null) {
        $scope.data.array1 = [];
      }
      else {

      }
      var tempval = null;
      for (var i = 0; i < $scope.data.arraytemp.length; i++) {
        tempval = Math.floor($scope.data.arraytemp[i]);
        if (tempval) {
          $scope.data.array1.push(tempval);
        }
      }

      $scope.data.arraytemp = null;
      $scope.form.form1 = '';
      ngProgress.complete();
    }
    $scope.resetArray = function () {
      $scope.data.array1 = null;
    }
    $scope.createParallel = function () {
      
      var parArray = [];
      for (var i = 0; i<$scope.data.array1.length; i++) {
        parArray.push($scope.data.array1[i]);
      }
      $scope.data.parallel.p = new Parallel(parArray);
      $scope.strings.p = {"options":$scope.data.parallel.p.options};

    }

    $scope.countFibo = function () {      var q = $scope.data.parallel.p;
      function fib(n) {
      return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
      };
      $scope.timer.ex1 = Date.now();
      $scope.working.ex1 = true;
      $timeout(function () {
        $scope.strings.res1 = '';
        $scope.strings.res2 = '';
        ngProgress.start();
      }, 10);

      $scope.timer.in1 = $interval(function () {
        $scope.strings.res3 = 'Computation started: ' + Math.floor(((Date.now() - $scope.timer.ex1 - 100)/1000)) + ' seconds ago.';
        if($scope.working.ex1 == false) {
          $interval.cancel($scope.timer.in1);
          $scope.strings.res3 = '';
        }
      }, 100);
      $scope.data.parallel.p.map(fib).then(function (res) {

        $timeout(function () {
          $scope.strings.res1 = 'The result is: ' + res;
          $scope.strings.res2 = 'Computed in: ' + ((Date.now() - $scope.timer.ex1 - 10)/1000) + ' seconds.';
          $scope.working.ex1 = false;
          ngProgress.complete();
        }, 10);
      });

    }

    $scope.init();
    //END OF PARALLEL CTRL
  });
