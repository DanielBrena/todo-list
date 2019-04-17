(function () {
    'use strict';

    angular
        .module('app.private')
        .factory('CookiesStorage', CookiesStorage);

        CookiesStorage.inject = ['$cookies'];
    function CookiesStorage($cookies) {
        var service = {
            put: put,
            putObject: putObject,
            get: get,
            getObject: getObject,
            getAll: getAll,
            remove: remove
        };
        return service;

        function put(key, val) {
            return $cookies.put(key, val);
        }

        function putObject(key, val) {
            return $cookies.put(key, val);
        }

        function get(key) {
            return $cookies.get(key);
        }

        function getObject(key) {
            return $cookies.getObject(key);
        }

        function getAll() {
            return $cookies.getAll();
        }

        function remove(key) {
            return $cookies.remove(key);
        }
    }
})();