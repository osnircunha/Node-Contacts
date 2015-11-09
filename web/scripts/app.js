/**
 * Created by osnircunha on 8/14/15.
 */
var app = angular.module('ContactApp', [
    'ngRoute',
    'ngAnimate',
    'directives.footer',
    'directives.header',
    'directives.loading',
    'controller.contact',
    'controller.login',
    'app.users',
    'app.notification',
    'app.directives.alert'
]);

app.run(function ($rootScope, loginModal, $window, $route) {
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
            controller: function ($routeParams, $scope, UsersServices, $location) {
                $scope.contactDetail = UsersServices.get({id: $routeParams.id});

                $scope.no = function () {
                    $location.url('/contact');
                };
            },
            access: {
                requiresLogin: true
            }
        }).otherwise('/welcome');
    //      $locationProvider.html5Mode(true);
}]);
