/**
 * Created by osnircunha on 9/03/15.
 */
angular.module('directives.header', [])
    .directive('headerSection', function () {
        return {
            controller: 'loginController',
            templateUrl: 'pages/directives/header.html'
        };
    });