'use strict';

// Declare app level module which depends on filters, and services

angular.module('projectsApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngRoute',
  'ngProgress'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/parallel', {
      templateUrl: 'partials/paralleljs',
      controller: 'ParallelCtrl'
    }).
    when('/others', {
      templateUrl: 'partials/others',
      controller: 'OtherCtrl'
    }).
    when('/testphp', {
      templateUrl: 'partials/testphp',
      controller: 'OtherCtrl'
    }).
    otherwise({
      redirectTo: '/parallel'
    });

  $locationProvider.html5Mode(true);
});
