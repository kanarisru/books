(function() {
    'use strict';


    angular.module('module.book')
        .directive("bgBook", bgBookDirective)
        .directive("srcBook", srcBookDirective);




    function bgBookDirective() {
        var directve = {
            link: link,
            restrict: 'A'
        };
        return directve;


        function link($scope, element, attributes) {
            var cover = attributes.bgBook;
            var href = 'http://storage.aggregion.com/api/files/'+cover+'/shared/data';

            var img = new Image();
            img.onload = function () {
                element.css({
                    'background-image': 'url(' + href + ')',
                    'background-size': 'cover'
                });
            };

            img.onerror = function () {
                element.css({
                    'background-image': 'url('+attributes.bgMock+')',
                    'background-size': 'cover'
                });
            };
            img.src = href;

        }
    }


    function srcBookDirective() {
        var directve = {
            link: link,
            restrict: 'A'
        };
        return directve;


        function link($scope, element, attributes) {
            var cover = attributes.srcBook;
            var href = 'http://storage.aggregion.com/api/files/'+cover+'/shared/data';

            var img = new Image();
            img.onload = function() {element.attr('src',href)};
            img.onerror = function() { element.attr('src',attributes.srcMock) };
            img.src = href;


        }
    }

})();
