(function () {
    'use strict';

    angular
        .module('app.private')
        .controller('TasksController', TasksController);

    TasksController.inject = ['$state', '$scope', 'TasksFactory', 'LxNotificationService', '$timeout'];
    function TasksController($state, $scope, TasksFactory, LxNotificationService, $timeout) {
        var vm = this;
        vm.dialogIdTask = 'updateTask'

        vm.dataAux = {
            task: {}
        }
        vm.events = {
            create: create,
            check: check,
            destroy: destroy,
            search: search,
            find:find
        }

        vm.config = {
            page: 1,
            limit: 3
        }

        $scope.$on('tasks_' + vm.dialogIdTask, function () {
            find(vm.config.page, vm.config.limit);
        });

        find(vm.config.page, vm.config.limit);


        ////////////////

        function create(task) {
            if (task || task != '') {
                TasksFactory.create(task).then(function (data) {
                    LxNotificationService.notify('Tarea creada');
                    vm.dataAux.task = {};
                    find(vm.config.page, vm.config.limit);
                }, function (error) {
                    console.error(error);
                });

            }
        }

        function find(page, limit) {
            TasksFactory.findByUser(page, limit).then(function (data) {
                vm.tasks = data.data.data;
                vm.config.page = data.data.page;
                vm.pagination = {
                    paginate: data.data.paginate,
                    page: data.data.page
                };
            }, function (error) {

            });
        }

        function search(query) {
            if (query) {
                vm.pagination = null;
                TasksFactory.search(query).then(function (data) {
                    vm.tasks = data.data.data;
                }, function (error) {

                });
            } else {
                find(vm.config.page, vm.config.limit);
            }

        }

        function check(task) {
            var taskAux = {
                task: {
                    id: task.id,
                    is_check: task.is_check
                }
            }
            if (task) {
                TasksFactory.update(taskAux).then(function (data) {
                    LxNotificationService.success('Tarea actualizada.');
                    find(vm.config.page, vm.config.limit);
                }, function (error) {
                    console.error(error);
                });
            }
        }

        function destroy(task) {
            task.removing = true;
            var timer;
            timer = $timeout(function () {
                TasksFactory.destroy(task.id).then(function (data) {
                    LxNotificationService.notify('¡Tarea eliminada!');
                    find(vm.config.page, vm.config.limit);
                }, function (error) {
                    console.error(error);
                });

            }, 5000);
            LxNotificationService.notify('Eliminando...', undefined, undefined, 'blue', 'Cancelar', function () {
                task.removing = false;
                $timeout.cancel(timer);
            }, 5 * 1000);

        }
    }
})();