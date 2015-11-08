/**
 * Created by osnircunha on 8/14/15.
 */
var app = angular.module('ContactApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'directives.footer',
    'directives.header',
    'directives.loading',
    'controller.contact',
    'controller.login'

]);

app.run(function ($rootScope, loginModal, notification, $window, $route) {
    // init content here
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.access !== undefined && $rootScope.currentUser === undefined) {
            event.preventDefault();
            loginModal()
                .then(function () {
                    $window.location.href = '#' + next.$$route.originalPath;
                });
        }
    });
});

app.service('loginModal', function ($modal, $rootScope) {

    return function () {
        var instance = $modal.open({
            templateUrl: 'pages/login.html',
            backdrop: 'static',
            keyboard: false,
            size: 'sm',
            controller: 'loginController'
        });

        return instance.result.then(function(user){
            $rootScope.currentUser = user;
        });
    };

});

app.factory('notification', function () {
    var notification = {};

    notification.showError = function (msg) {
        new PNotify({
            title: 'Erro:',
            text: msg,
            type: 'error',
            buttons: {
                sticker: false
            }
        });
    };

    notification.showSuccess = function (msg) {
        new PNotify({
            title: 'Sucesso:',
            text: msg,
            type: 'success',
            buttons: {
                sticker: false
            }
        });
    };
    return notification;
});

app.config(['$routeProvider', function ($routeProvider) {
    // For any unmatched url, redirect to /state1
    $routeProvider
        .when("/welcome", {
            templateUrl: "pages/home.html",
            controller: 'loginController',
        })
        .when("/contact", {
            templateUrl: "pages/contacts.html",
            controller: 'contactController',
            access: {
                requiresLogin: true
            }
        })
        .when("/contact/:id", {
            templateUrl: "pages/directives/view-contact-modal.html",
            controller: function ($routeParams, $http, $scope, notification) {
                $http({
                    method: 'GET',
                    url: '/rest/contacts/' + $routeParams.id
                }).then(function (resp) {
                    $scope.contactDetail = resp.data;
                }, function (resp) {
                    notification.showError('Erro ao recuperar contato.');
                });

                $scope.no = function () {
                    $location.url('/contact');
                };
            },
            access: {
                requiresLogin: true
            },
            resolve: function () {
                return {
                    login: false,
                    label: 'welcome'
                };
            }
        }).otherwise('/welcome');
    //      $locationProvider.html5Mode(true);
}]);
