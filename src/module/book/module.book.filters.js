(function() {
    'use strict';


    angular.module('module.book')
        .filter('plain', plainFilter);

    plainFilter.$inject = ['$sce'];
    function plainFilter($sce) {
        return function (plainText) {
            return $sce.trustAsHtml(plainText.replace(/\n/g,"<br>"));
        }
    }


})();