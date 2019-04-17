(function () {
  'use strict'
  angular.module('app', [
    'app.core',
    'app.public',
    'app.private',
  ]).constant('CONFIG', {
    "APIURL": "http://localhost:1337/"
  }).config(function ($httpProvider, $compileProvider, ) {
    $httpProvider.defaults.withCredentials = true;
  }).run(function ($rootScope, $state, $window, CONFIG,CookiesStorage) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var status = CookiesStorage.get('auth')

      if(!status && toState.auth.authorization == false){
      }else if(!status && toState.auth.authorization == true){
        $state.go('login');
        event.preventDefault();
      }else if(status && toState.auth.authorization == false){
        event.preventDefault();
      }else if(status && toState.auth.authorization == true ){
     
      }

    });
  });
})();
