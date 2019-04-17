(function () {
    'use strict';

    angular
        .module('app.private')
        .factory('TasksFactory', TasksFactory);

    TasksFactory.inject = ['$http', 'CONFIG'];
    function TasksFactory($http, CONFIG) {
        var URL = CONFIG.APIURL + 'tasks';

        var service = {
            create: create,
            update:update,
            destroy:destroy,
            findByUser:findByUser,
            findOne:findOne,
            search:search
        };

        return service;

        ////////////////
        function create(data) {
            var result = $http.post(URL, data);
            return result;
        }

        function findByUser(page,limit){
            var result = $http.get(URL + '/user?page=' + page + '&limit=' + limit);
            return result;
        }

        function findOne(id){
            var result = $http.get(URL+'/'+id);
            return result;
        }

        function update(data){
            var result = $http.put(URL+'/'+data.task.id,data);
            return result;
        }

        function destroy(id){
            var result = $http.delete(URL+'/'+id);
            return result;
        }
        function search(query){
            var result = $http.get(URL+'/search?query='+query);
            return result;
        }
    }
})();