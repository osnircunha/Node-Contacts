/**
 * Created by osnircunha on 9/24/15.
 */

angular.module('controller.contact', ['ngRoute', 'app.users', 'modal.service', 'app.notification'])
    .controller('contactController', function ($rootScope, $scope, $routeParams, NotificationService, $http, UsersServices, ModalService) {

    $scope.saveContact = function () {
        try {
            if ($scope.contact.name && $scope.contact.phone && $scope.contact.email) {
                UsersServices.save($scope.contact).$promise.then(
                    function (resp) {
                        NotificationService.showSuccess('Contato salvo.');
                        $scope.listContacts();
                    }, function (resp) {
                        throw resp;
                    });
            } else {
                NotificationService.showError('Erro ao salvar contato.');
            }
        } catch (err) {
            NotificationService.showError('Erro ao salvar contato. ' + err.message);
        }
    };

    $scope.updateContact = function () {
        try {
            if ($scope.contact.name && $scope.contact.phone && $scope.contact.email) {
                UsersServices.update($scope.contact).$promise.then(
                    function (resp) {
                        NotificationService.showSuccess('Contato atualizado.');
                        $scope.listContacts();
                    }, function (resp) {
                        throw resp;
                    });
            } else {
                NotificationService.showError('Erro ao salvar contato.');
            }
        } catch (err) {
            NotificationService.showError('Erro ao salvar contato. ' + err.message);
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
            NotificationService.showSuccess('Contato removido.');
            $scope.listContacts();
        }, function (resp) {
            NotificationService.showError('Erro ao remover contato.');
        });
    };

    $scope.showDetailModal = function (id) {
        ModalService.createModal(
            {
                id: function () {
                    return id;
                }
            },
            "pages/directives/view-contact-modal.html",
            function (id) {
                $scope.getContact(id);

                $scope.no = function () {
                    this.$dismiss();
                };
            },
            $scope
        );
    };

    $scope.showDeleteModal = function (contact) {
        ModalService.createModal(
            {
                c: function () {
                    return contact;
                }
            },
            "pages/directives/delete-contact-modal.html",
            function (c) {
                $scope.c = c;

                $scope.yes = function (id) {
                    $scope.getContact(id);
                    this.$dismiss();
                };
                $scope.no = function () {
                    this.$dismiss();
                };
            },
            $scope
            );
    };

    $scope.showNewModal = function (action, c) {
        ModalService.createModal({
                action: function () {
                    return action;
                },
                c: function () {
                    return c;
                }
            }, "pages/directives/new-contact-modal.html",
            function (action, c) {
                $scope.action = action;
                $scope.salvar = function (c) {
                    $scope.contact = c;
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
            $scope
        );
    };

    $scope.listContacts();

});
