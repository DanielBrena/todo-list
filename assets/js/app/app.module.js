(function () {
    'use strict'
    angular.module('app', [
        'app.core'
    ]).constant('CONFIG', {
      "APIURL": "http://localhost:1337/"
    }).config(function ($httpProvider, $compileProvider, ) {
       $httpProvider.defaults.withCredentials = true;
    }).run(function ($rootScope, $state,$window,CONFIG) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
       
      });
    });
  })();
  