(function() {
    'use strict';
    
        angular
            .module('app.core')
            .factory('Broadcast', Broadcast);
    
        Broadcast.inject = ['$rootScope'];
        function Broadcast($rootScope) {
            var service = {
                broadcast:broadcast
            };
            service.data = {};
            
            return service;
    
            ////////////////
            function broadcast(data,broadcastName) {
                this.data = data;
                $rootScope.$broadcast(broadcastName);
             }
        }
    })();