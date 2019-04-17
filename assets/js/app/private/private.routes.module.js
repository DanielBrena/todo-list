(function () {
    'use strict'
    angular.module('app.private.routes', [])
      .run(appRun);
  
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates(), '/');
    }
  
    function getStates() {
      return [{
        state: 'admin',
        config: {
          url: '/admin',
          abstract: true,
          templateUrl: 'js/app/private/private.html',
          controller: 'AdminController',
          controllerAs: 'vm',
          auth: {
            authorization: true,
            redirectTo: 'login',
            rol: ['Administrator'],
            permisos: ['get', 'put', 'post', 'delete']
          }
        }
      },
      {
        state: 'admin.tasks',
        config: {
          url: '/tasks',
          templateUrl: 'js/app/private/tasks/tasks.html',
          controller: 'TasksController',
          controllerAs: 'vm',
          auth: {
            authorization: true,
            redirectTo: 'login',
            rol: ['Administrator'],
            permisos: ['get', 'put', 'post', 'delete']
          }
        }
      },
      {
        state: 'admin.users',
        config: {
          url: '/users',
          templateUrl: 'js/app/private/users/users.html',
          controller: 'UsersController',
          controllerAs: 'vm',
          auth: {
            authorization: true,
            redirectTo: 'login',
            rol: ['Administrator'],
            permisos: ['get', 'put', 'post', 'delete']
          }
        }
      }]
    }
  })();
  