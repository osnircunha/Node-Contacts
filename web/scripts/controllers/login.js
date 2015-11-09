/**
 * Created by osnircunha on 9/24/15.
 */
angular.module('controller.login', ['ngRoute']).controller('loginController', function ($scope, $rootScope, NotificationService, $http, $location) {

    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };

    $scope.submit = function () {
        if ($scope.username && $scope.password) {
            var user = { username : $scope.username, password : $scope.password };
            var req = {
                method: 'POST',
                url: 'rest/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'username=' + $scope.username + '&credential=' + btoa($scope.username + ':' + $scope.password)
            };
            $http(req).then(function (resp) {
                $scope.invalidCredentials = false;
                $scope.$close(user);
            }, function (resp) {
                NotificationService.showError('Credenciais invalidas.');
                $scope.invalidCredentials = true;
            });
        } else {
            NotificationService.showError('Por favor preencha nome e senha.');
            $scope.invalidCredentials = true;
        }
    };

    $scope.logout = function(){
        delete $rootScope.currentUser;
        //$state.go('welcome');
        $scope.$apply( $location.path( 'welcome' ) );
    };

    //var loggedButton = angular.element('#logged-user');
    angular.element('ul.nav li.dropdown').hover(function() {
        angular.element(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
        angular.element(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
    });

});