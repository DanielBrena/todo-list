(function() {
'use strict';

    angular
        .module('app.private')
        .controller('AdminController', AdminController);

    AdminController.inject = ['$state','CookiesStorage'];
    function AdminController($state,CookiesStorage) {
        var vm = this;
        vm.events = {
            logout:logout
        }
        

        

        ////////////////

        function logout() {
            CookiesStorage.remove('auth');
            $state.go('login');
         }
    }
})();