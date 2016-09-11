(function() {
    'use strict';


    angular.module('module.book')
        .config(moduleBookConfig);


    moduleBookConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleBookConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state("list", {
            url: '/',
            templateUrl: '/templates/book.list.html',
            controller: 'BookListController',
            controllerAs: 'vm'
        });

        $stateProvider.state("book", {
            url: '/book/:id',
            templateUrl: '/templates/book.info.html',
            controller: 'BookInfoController',
            controllerAs: 'vm',
            resolve: {
                book: resolveBook,
                bundles: resolveBundles
            }
        });

        $stateProvider.state("error404", {
            url: '/error404',
            templateUrl: '/templates/404.html'
        });

        $stateProvider.state("error400", {
            url: '/error400',
            templateUrl: '/templates/400.html'
        });

        $stateProvider.state("error500", {
            url: '/error500',
            templateUrl: '/templates/500.html'
        });

        $urlRouterProvider.otherwise('/error404');
    }




    resolveBook.$inject = ['$stateParams', 'apiService'];
    function resolveBook($stateParams, apiService) {
        return apiService.book.getBookInfo({bookId:$stateParams.id});
    }

    resolveBundles.$inject =  ['$stateParams', 'apiService'];
    function resolveBundles($stateParams, apiService) {
        return apiService.bundle.getBundleList({bookId:$stateParams.id});
    }






})();