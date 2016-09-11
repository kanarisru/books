(function() {
    'use strict';


    angular.module('module.book')
        .controller("BookListController", BookListController)
        .controller("BookInfoController", BookInfoController);






    BookInfoController.$inject = ['$state','book','bundles', 'dialogAlert'];
    function BookInfoController($state, book, bundles,  dialogAlert){
        var vm = this;

        book.$promise.then(function(){
            vm.book = book;
        },function(data){
            if("404,400,500".indexOf(data.status)!==-1) $state.go("error"+data.status);
            else dialogAlert.show(result.status, "Неизвестная ошибка");
        });


        book.$promise.then(function(){
            vm.bundles = bundles;
        },function(data){
            if("404,400,500".indexOf(data.status)!==-1) $state.go("error"+data.status);
            else dialogAlert.show(result.status, "Неизвестная ошибка");

        });

        vm.goList = function() {
            $state.go("list");
        }
    }



    BookListController.$inject = ['apiService', '$state', 'dialogAlert'];
    function BookListController( apiService, $state, dialogAlert){
        var vm = this;


        apiService.book.getBookList(
            function(result){
                vm.list  = result;
            },
            function(result){
                if("404,400,500".indexOf(result.status)!==-1) $state.go("error"+result.status);
                else dialogAlert.show(result.status, "Неизвестная ошибка");

            }
        );



    }







})();