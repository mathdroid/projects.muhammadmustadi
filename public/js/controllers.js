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
  controller('ParallelCtrl', function ($scope, $interval, $timeout, ngProgress) {
    // write Ctrl here
    $scope.init = function () {
      $scope.data = {"parallel": {}};
      $scope.form = {};
      $scope.strings = {"res3": ''};
      $scope.timer = {};
      $scope.working = {"ex1": false};
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
      // console.log('creating parallel variable');
      
      var parArray = [];
      for (var i = 0; i<$scope.data.array1.length; i++) {
        parArray.push($scope.data.array1[i]);
      }
      $scope.data.parallel.p = new Parallel(parArray);
      $scope.strings.p = {"options":$scope.data.parallel.p.options};
    //   console.log($scope.data.parallel.p);
    //   console.log($scope.data.parallel.p.data);
    //   console.log($scope.data.parallel.p.options.maxWorkers);
    }
    // $scope.resFibo = function (res) {
    //   console.log(res);
    //   console.log($scope);
    //   $scope.strings.res1 = 'qwe';
    //   $scope.strings.res2 = 'rty';
    //   $scope.strings.res3 = res;
    //   console.log($scope);
    // }
    // $scope.check = function () {
    //   console.log('checka');
    //   console.log($scope.strings.res3);
    //   $scope.strings.res4 = $scope.strings.res3;
    // }

    // $scope.addNum = function () {
    //   console.log('adding');
    //   if ($scope.data.z) {
    //     $scope.data.z = $scope.data.x + $scope.data.y + $scope.data.z;
    //   }
    //   else {
    //     $scope.data.z = $scope.data.x + $scope.data.y;
    //   }
    //   console.log($scope.data);
    // }
    // $scope.addNumRepeat = function () {
    //   $interval(function () {
    //     $scope.addNum();
    //   }, 1000);
    // }
    $scope.countFibo = function () {      var q = $scope.data.parallel.p;
      function fib(n) {
      return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
      };
      $scope.timer.ex1 = Date.now();
      $scope.working.ex1 = true;
      $timeout(function () {
        console.log('calling ngProgress');
        ngProgress.start();
      }, 10);

      $scope.timer.in1 = $interval(function () {
        // body...
        $scope.strings.res3 = 'started: ' + Math.floor(((Date.now() - $scope.timer.ex1 - 100)/1000)) + ' seconds ago.';
        if($scope.working.ex1 == false) {
          $interval.cancel($scope.timer.in1);
          $scope.strings.res3 = '';
        }
      }, 100);
      $scope.data.parallel.p.map(fib).then(function (res) {
        // // $scope.resFibo(res);
        // console.log(res);
        // console.log($scope.data.parallel.p);
        $timeout(function () {
          $scope.strings.res1 = 'the result is: ' + res;
          $scope.strings.res2 = 'computed in: ' + ((Date.now() - $scope.timer.ex1 - 10)/1000) + ' seconds.';
          $scope.working.ex1 = false;
          ngProgress.complete();
        }, 10);
      });
      // $scope.data.to = $interval(function () {
      //   $scope.check();
      // }, 1000);

      // console.log($scope);
      // $scope.strings.res1 = 'zxc';
      // $scope.strings.res2 = 'vbn';
      // console.log($scope);
      // $scope.strings.res1 = 'Computation started ' + (Date.now() - $scope.data.start1)/1000 + 's ago';
      // q.map(fib).then(function (res) {
      //   console.log(res);
      //   $scope.strings.res1 = 'FINIZED';
      //   $scope.strings.res2 = res;
      //   $scope.data.res2 = res;
      //   console.log($scope.strings.res2);
      //   console.log($scope);
      // });
      // var to;
      // var check = function (val) {
      //   $scope.strings.res1 = 'Computation started ' + (Date.now() - $scope.data.start1)/1000 + 's ago';
      //   console.log('asdf ' + Date.now() + ' > ' + $scope.data.start1);
      //   console.log($scope.strings.res1);
      // }
      // to = setInterval(check, 1000);
      // --
      // $scope.strings.res1 = 'Computation started';
      // $scope.log = 'Computation started';

      // var start = Date.now();
      // var q = $scope.data.parallel.p;
      // var done = false;
      // var to;

      // var check = function (val) {
      //   if (!done) {
      //     $scope.strings.res1 = 'Computation started: ' + Math.floor((Date.now() - start) / 1000) + 's ago';
      //     // console.log('Computation started: ' + Math.floor((Date.now() - start) / 1000) + 's ago');
      //     console.log($scope.strings.res1);
      //     // $(that).siblings('.result').html('Computation started: ' + Math.floor((Date.now() - start) / 1000) + 's ago');
      //   } else {
      //     clearTimeout(to);
      //     // console.log('Result is: [' + val.join(', ') + ']. Computed in: ' + Math.floor((Date.now() - start) / 1000) + ' seconds.');
      //     $scope.strings.result1 = 'Result is: [' + val.join(', ') + ']. Computed in: ' + Math.floor((Date.now() - start) / 1000) + ' seconds.';
      //     console.log($scope.strings.result1);
      //     done = true;
      //     return $scope.strings.result1;
      //     // return $(that).siblings('.result').html('Result is: [' + val.join(', ') + ']. Computed in: ' + Math.floor((Date.now() - start) / 1000) + ' seconds.');
      //   }

      //   to = setTimeout(check, 1000);
      // };

      // q.map(fib).then(function (res) {
      //   done = true;
      //   // check(res);
      //   $scope.strings.res1 = 'Computation done. ' + res;
      //   console.log('done bitch');
      //   $scope.strings.x = 'asd';
      //   console.log(res);
      //   $scope.log = res;
      // });
    }

    $scope.init();
    //END OF PARALLEL CTRL
  });
