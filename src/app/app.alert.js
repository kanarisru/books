(function() {
    'use strict';


    angular.module('app')
        .service('dialogAlert', dialogAlertService);

    dialogAlertService.$inject = ['$mdDialog', '$state'];
    function dialogAlertService($mdDialog, $state) {
        var dialog = false;
        function goHome() {
            $state.go("list");
            dialog = false;
        }

        var service = {
            error404: function() {
                service.show("404","Запрашиваемая страница не существует");
            },
            error400: function() {
                service.show("400","Не верный запрос к получению данных");
            },
            error500: function() {
                service.show("500","Проблемы связи с серверов");
            },
            show: function(title, text) {
                if(dialog) return;
                dialog = true;
                $mdDialog
                    .show(  $mdDialog.alert()
                        .parent(angular.element(document.querySelector('body')))
                        .clickOutsideToClose(false)
                        .title(title)
                        .textContent(text)
                        .ok('Перейти к списку')
                        .targetEvent(null)
                )
                    .then(goHome, goHome)
            }
        };
        return service;
    }


})();

