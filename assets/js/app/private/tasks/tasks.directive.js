(function () {
    'use strict';
  
    angular
      .module('app.private')
      .directive('tasks', Tasks)
      .directive('eventTasks', EventTasks)
  
    function Tasks() {
      var directive = {
        controller: ControllerController,
        controllerAs: 'vm',
        link: link,
        bindToController: true,
        restrict: 'E',
        scope: {
          id:'@',
          dialogId: '@'
        },
        templateUrl: 'js/app/private/tasks/tasks.directive.html'
  
      };
      return directive;
  
      function link(scope, element, attrs, ctrl) {
  
      }
    }
  
    function EventTasks(Broadcast, LxDialogService,$timeout) {
  
      var directive = {
        link: link,
        restrict: 'A',
        scope: {},
      };
      return directive;
  
      function link(scope, element, attrs) {
        element.dblclick(function () {
          var event = attrs.eventTasks;
          var id = attrs.dialogId;
          if (event) {
            if (event === 'open') {
              LxDialogService.open(id);
              $timeout(function(){
                $("#task-title").focus();
              },100);
            } else {
              LxDialogService.close(id);
            }
            Broadcast.broadcast(event, 'event_tasks_'+id);
          }
        });
      }
    }
  
    /* @ngInject */
    function ControllerController($scope, Broadcast, $timeout, LxNotificationService, TasksFactory, LxDialogService) {
      var vm = this;
      vm.dataAux = {
        task:{}
      }
  
      vm.config = {
        sending: false
      };
    
      vm.events = {
        update: update
      }


      $scope.$watch('vm.dialogId', function (newValue) {
        if (newValue != undefined) {
            $scope.$on('event_tasks_'+vm.dialogId, function () {
                var event = Broadcast.data;
                if (event == 'open') {
                    findOne(vm.id);
                }else{
          
                }
              });
        }
    });

    function findOne(id){
        TasksFactory.findOne(id).then(function(data){
            vm.dataAux.task = data.data;
        },function(error){

        });
    }

   
  
     
  
  
     
  
  
  
     
      function update(data) {
        vm.config.sending = true;
        TasksFactory.update(data).then(function (data) {
          Broadcast.broadcast(data, 'tasks_'+vm.dialogId);
          vm.config.sending = false;
          LxDialogService.close(vm.dialogId);
          LxNotificationService.success('Tarea actualizada exitosamente');
        }, function (error) {
          vm.config.sending = false;
          LxDialogService.close(vm.dialogId);
        });
      }
  
  
  
   
     
  
      
      
    }
  })();
  