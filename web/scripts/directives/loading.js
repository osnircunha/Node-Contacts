/**
 * Created by osnircunha on 9/03/15.
 */
angular.module('directives.loading', [])
    .directive('loadingView', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'pages/directives/loading.html',
            link: function(scope, element){
                $timeout(function () {
                    element.fadeOut( "slow" );
                }, 2000);
            },
        };
    });