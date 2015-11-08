/**
 * Created by osnircunha on 9/24/15.
 */

angular.module('controller.contact', ['ngRoute', 'app.users'])
    .controller('contactController', function ($rootScope, $scope, $routeParams, notification, $http, UsersServices, $modal) {

    $scope.saveContact = function () {
        try {
            if ($scope.contact.name && $scope.contact.phone && $scope.contact.email) {
                UsersServices.save($scope.contact).$promise.then(
                    function (resp) {
                        notification.showSuccess('Contato salvo.');
                        $scope.listContacts();
                    }, function (resp) {
                        throw resp;
                    });
            } else {
                notification.showError('Erro ao salvar contato.');
            }
        } catch (err) {
            notification.showError('Erro ao salvar contato. ' + err.message);
        }
    };

    $scope.updateContact = function () {
        try {
            if ($scope.contact.name && $scope.contact.phone && $scope.contact.email) {
                UsersServices.update($scope.contact).$promise.then(
                    function (resp) {
                        notification.showSuccess('Contato atualizado.');
                        $scope.listContacts();
                    }, function (resp) {
                        throw resp;
                    });
            } else {
                notification.showError('Erro ao salvar contato.');
            }
        } catch (err) {
            notification.showError('Erro ao salvar contato. ' + err.message);
        }
    };

    $scope.listContacts = function () {
        $scope.contacts = UsersServices.list();
    };

    $scope.getContact = function (id) {
        $scope.contactDetail = UsersServices.get({id: id});
    };

    $scope.deleteContact = function (id) {
        UsersServices.delete({id: id}).$promise.then(function (resp) {
            notification.showSuccess('Contato removido.');
            $scope.listContacts();
        }, function (resp) {
            notification.showError('Erro ao remover contato.');
        });
    };

    $scope.showDetailModal = function (id) {
        $modal.open({
            templateUrl: "pages/directives/view-contact-modal.html",
            resolve: {
                id: function () {
                    return id;
                }
            },
            controller: function (id) {
                $scope.getContact(id);

                $scope.no = function () {
                    this.$dismiss();
                };
            },
            scope: $scope,
            size: 'sm'
        });
    };

    $scope.showDeleteModal = function (contact) {
        $modal.open({
            templateUrl: "pages/directives/delete-contact-modal.html",
            resolve: {
                c: function () {
                    return contact;
                }
            },
            controller: function (c) {
                $scope.c = c;

                $scope.yes = function (id) {
                    $scope.getContact(id);
                    this.$dismiss();
                };
                $scope.no = function () {
                    this.$dismiss();
                };
            },
            scope: $scope,
            size: 'sm'
        });
    };

    $scope.showNewModal = function (action, c) {
        $modal.open({
            resolve: {
                action: function () {
                    return action;
                },
                c: function () {
                    return c;
                }
            },
            templateUrl: "pages/directives/new-contact-modal.html",
            controller: function (action, c) {
                $scope.action = action;
                $scope.salvar = function (contact) {
                    $scope.contact = contact;
                    $scope.saveContact();
                    this.$dismiss();
                };
                if (c) {
                    $scope.contact = JSON.parse(JSON.stringify(c));
                }
                $scope.atualizar = function (contact) {
                    $scope.updateContact();
                    this.$dismiss();
                };
                $scope.no = function () {
                    this.$dismiss();
                };
            },
            scope: $scope,
            size: 'sm',
        });
    };

    $scope.listContacts();

});
