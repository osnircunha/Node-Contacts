/**
 * Created by osnircunha on 8/14/15.
 */
var app = angular.module('ContactApp', ['ui.router', 'ngAnimate',
  'ui.bootstrap',
  'directives.footer',
  'directives.header',
  'directives.loading',
]);

app.run(function($rootScope, $state, loginModal, notification) {
  // init content here
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    $rootScope.page = toState.name;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();

      loginModal()
        .then(function() {
          return $state.go(toState.name, toParams);
        })
        .catch(function() {
          if ($state.current.name == 'welcome') {
            $state.forceReload();
          } else {
            return $state.go('welcome');
          }
        });
    }
  });
});

app.service('loginModal', function($modal, $rootScope) {

  function assignCurrentUser(user) {
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: 'pages/login.html',
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      controller: 'loginController'
    });

    return instance.result.then(assignCurrentUser);
  };

});

app.factory('notification', function() {
  return {
    showError: function(msg) {
      new PNotify({
        title: 'Erro:',
        text: msg,
        type: 'error',
        buttons: {
          sticker: false
        }
      });
    },
    showSuccess: function(msg) {
      new PNotify({
        title: 'Sucesso:',
        text: msg,
        type: 'success',
        buttons: {
          sticker: false
        }
      });
    }
  };
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider,
  $provide) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/welcome");

  $stateProvider
    .state('welcome', {
      url: "/welcome",
      templateUrl: "pages/home.html",
      controller: 'loginController',
      data: {
        requireLogin: false
      }
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "pages/contacts.html",
      controller: 'contactController',
      data: {
        requireLogin: true
      }
    })
    .state('contactDetail', {
      url: "/contact/:id",
      templateUrl: "pages/directives/view-contact-modal.html",
      controller: function($stateParams, $http, $scope, notification,
        $state) {
        $http({
          method: 'GET',
          url: '/rest/contacts/' + $stateParams.id
        }).then(function(resp) {
          $scope.contactDetail = resp.data;
        }, function(resp) {
          notification.showError('Erro ao recuperar contato.');
        });

        $scope.no = function() {
          $state.go('contact');
        };
      },
      data: {
        requireLogin: true
      }
    });
    //      $locationProvider.html5Mode(true);

  $provide.decorator('$state', function($delegate, $stateParams) {
    $delegate.forceReload = function() {
      return $delegate.go($delegate.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    };
    return $delegate;
  });

});
