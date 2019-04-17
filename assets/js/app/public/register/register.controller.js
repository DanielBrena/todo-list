(function() {
'use strict';

    angular
        .module('app.public')
        .controller('RegisterController', RegisterController);

    RegisterController.inject = ['$state','UsersFactory','LxNotificationService'];
    function RegisterController($state,UsersFactory,LxNotificationService) {
        var vm = this;
        vm.dataAux = {
            user:{}
        };
        

        vm.events = {
            register:register
        }

        ////////////////

        function register(data) { 
            UsersFactory.create(data).then(function(data){
                LxNotificationService.success('Usuario creado exitosamente');
                $state.go('admin.tasks');
            },function(error){
                console.error(error);
                if(error && error.data && error.data.errores){
                    error.data.errores.forEach(function(e){
                        LxNotificationService.error(e.mensaje + ' - ' + e.descripcion);
                    });
                }
            });
        }
    }
})();