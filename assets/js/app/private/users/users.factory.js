(function() {
'use strict';

    angular
        .module('app.private')
        .factory('UsersFactory', UsersFactory);

    UsersFactory.inject = ['$http','CONFIG'];
    function UsersFactory($http,CONFIG) {
        var URL = CONFIG.APIURL + 'users';
  
        var service = {
            create:create,
            findOne:findOne,
            update:update,
            auth:auth
        };

        return service;

        ////////////////

        function auth(data){
            var result = $http.post(URL+'/auth',data);
            return result;
        }

        function create(data) {
            var result = $http.post(URL,data);
            return result;
         }

         function findOne(id){
             var result = $http.get(URL+'/'+id);
             return result;
         }
         function update(data){
             var result = $http.put(URL+'/'+data.id,data);
             return result;
         }
    }
})();