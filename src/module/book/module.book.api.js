(function() {
    'use strict';
    angular.module('module.book')
        .factory('apiService', apiService);


    apiService.$inject = ['$resource'];
    function apiService($resource) {
        var api_book_url = 'https://ds.aggregion.com/api/public/catalog/:bookId';
        var api_book_services = {
            getBookInfo: {method: 'get'},
            getBookList: {method: 'get', isArray: true}
        };

        var bookResource = $resource(api_book_url, {bookId: '@bookId'}, api_book_services);

        var api_bundle_url = 'https://ds.aggregion.com/api/public/catalog/:bookId/bundles/:bundleId';
        var api_bundle_services = {
            getBundle: {method: 'get'},
            getBundleList: {method: 'get', isArray: true}
        };

        var bundleResource = $resource(api_bundle_url, {bookId: '@bookId',bundleId: '@bundleId'}, api_bundle_services);

        return {
            book: bookResource,
            bundle: bundleResource
        };
    }
})();