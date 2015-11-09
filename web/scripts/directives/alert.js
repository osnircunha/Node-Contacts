/**
 * Created by osnircunha on 9/03/15.
 */
angular.module('app.directives.alert', ['app.users'])
    .directive('alertBox', function (HttpResponseHandler) {
        return {
            restrict: 'E',
            templateUrl: 'pages/directives/alert.html',
            link: function(scope, element){

                var toggle = function(title, message, type){
                    scope.error = title;
                    scope.message = message;
                    scope.alertType = type;
                    if(element.context.hidden) {
                        element.show("slow");
                        setTimeout(function () {
                            scope.close();
                        } , 3000);
                    }
                };

                scope.close = function(){
                    element.hide("slow");
                };

                HttpResponseHandler.addObserver(toggle);
            }
        };
    });