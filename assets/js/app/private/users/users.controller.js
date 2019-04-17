(function() {
'use strict';

    angular
        .module('app.private')
        .controller('UsersController', UsersController);

    UsersController.inject = ['$state','UsersFactory','CookiesStorage','LxNotificationService'];
    function UsersController($state,UsersFactory,CookiesStorage,LxNotificationService) {
        var vm = this;
        vm.dataAux = {
            user:{}
        }
        
        vm.events = {
            update:update
        }

        findOne(CookiesStorage.get('auth'));

        ////////////////

        function findOne(id) {
            UsersFactory.findOne(JSON.parse(id).auth.id).then(function(data){
                vm.dataAux.user = data.data;
            },function(error){

            });
         }

         function update(data){
             UsersFactory.update(data).then(function(data){
                LxNotificationService.success('Usuario actualizado');
             },function(error){

             });
         }
    }
})();