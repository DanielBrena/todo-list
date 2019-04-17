(function() {
'use strict';

    angular
        .module('app.public')
        .controller('LoginController', LoginController);

    LoginController.inject = ['$state','UsersFactory','LxNotificationService'];
    function LoginController($state,UsersFactory,LxNotificationService) {
        var vm = this;
        vm.dataAux = {
            user:{}
        }
        

        vm.events = {
            login:login
        }

        ////////////////

        function login(user) {
            UsersFactory.auth(user).then(function(data){
                $state.go('admin.tasks');
            },function(error){
                if(error && error.data && error.data.errores){
                    error.data.errores.forEach(function(e){
                        LxNotificationService.error(e.mensaje + ' - ' + e.descripcion);
                    });
                }
            });
         }
    }
})();