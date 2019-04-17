(function () {
    'use strict'
    angular.module('app.public.routes', [])
      .run(appRun);
  
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates(), '/');
    }
  
    function getStates() {
      return [{
        state: 'login',
        config: {
          url: '/',
          templateUrl: 'js/app/public/login/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          auth: {
            authorization: false,
          }
        }
      },
      {
        state: 'register',
        config: {
          url: '/register',
          templateUrl: 'js/app/public/register/register.html',
          controller: 'RegisterController',
          controllerAs: 'vm',
          auth: {
            authorization: false,
          }
        }
      }]
    }
  })();
  