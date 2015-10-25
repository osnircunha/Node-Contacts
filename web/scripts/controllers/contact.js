/**
 * Created by osnircunha on 9/24/15.
 */

app.controller('contactController', function($rootScope, $scope, $stateParams, notification, $http, $modal) {

  $scope.saveContact = function() {
    try {
      if ($scope.contact.name && $scope.contact.phone && $scope.contact.email) {
        var req = {
          method: 'POST',
          url: 'rest/contacts',
          data: $scope.contact
        };
        $http(req).then(function(resp) {
          notification.showSuccess('Contato salvo.');
          $scope.listContacts();
        }, function(resp) {
          throw resp;
        });
      } else {
        notification.showError('Erro ao salvar contato.');
      }
    } catch (err) {
      notification.showError('Erro ao salvar contato. ' + err.message);
    }
  };

  $scope.updateContact = function() {
    try {
      if ($scope.contact.name && $scope.contact.phone && $scope.contact.email) {
        var req = {
          method: 'PUT',
          url: 'rest/contacts',
          data: $scope.contact
        };
        $http(req).then(function(resp) {
          notification.showSuccess('Contato atualizado.');
          $scope.listContacts();
        }, function(resp) {
          throw resp;
        });
      } else {
        notification.showError('Erro ao salvar contato.');
      }
    } catch (err) {
      notification.showError('Erro ao salvar contato. ' + err.message);
    }
  };

  $scope.listContacts = function() {
    $http({
      method: 'GET',
      url: '/rest/contacts',
    }).then(function(resp) {
      $scope.contacts = resp.data;
    }, function(resp) {
      console.error('Erro ao listar contato.');
    });
  };

  $scope.getContact = function(id) {
    $http({
      method: 'GET',
      url: '/rest/contacts/' + id
    }).then(function(resp) {
      $scope.contactDetail = resp.data;
    }, function(resp) {
      notification.showError('Erro ao recuperar contato.');
    });
  };

  $scope.deleteContact = function(id) {
    $http({
      method: 'DELETE',
      url: '/rest/contacts/' + id
    }).then(function(resp) {
      notification.showSuccess('Contato removido.');
      $scope.listContacts();
    }, function(resp) {
      notification.showError('Erro ao remover contato.');
    });
  };

  $scope.showDetailModal = function(id) {
    $modal.open({
      templateUrl: "pages/directives/view-contact-modal.html",
      resolve: {
        id: function() {
          return id;
        }
      },
      controller: function(id) {
        $scope.getContact(id);

        $scope.no = function() {
          this.$dismiss();
        };
      },
      scope: $scope,
      size: 'sm',
    });
  };

  $scope.showDeleteModal = function(contact) {
    $modal.open({
      templateUrl: "pages/directives/delete-contact-modal.html",
      resolve: {
        c: function() {
          return contact;
        }
      },
      controller: function(c) {
        $scope.c = c;

        $scope.yes = function(id) {
          $scope.deleteContact(id);
          this.$dismiss();
        };
        $scope.no = function() {
          this.$dismiss();
        };
      },
      scope: $scope,
      size: 'sm',
    });
  };

  $scope.showNewModal = function(action, c) {
    $modal.open({
      resolve: {
        action: function() {
          return action;
        },
        c: function() {
          return c;
        }
      },
      templateUrl: "pages/directives/new-contact-modal.html",
      controller: function(action, c) {
        $scope.action = action;
        $scope.salvar = function(contact) {
          $scope.contact = contact;
          $scope.saveContact();
          this.$dismiss();
        };
        if (c) {
          $scope.contact = JSON.parse(JSON.stringify(c));
        }
        $scope.atualizar = function(contact) {
          $scope.updateContact();
          this.$dismiss();
        };
        $scope.no = function() {
          this.$dismiss();
        };
      },
      scope: $scope,
      size: 'sm',
    });
  };

  $scope.listContacts();

});
