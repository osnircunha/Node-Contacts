/**
 * Created by osnircunha on 11/6/15.
 */
var appUsers = angular.module('app.users', ['ngResource', 'app.notification']);

appUsers.factory('HttpResponseHandler', function (NotificationService) {
    var observers = [];

    return{
        interceptor: {
            responseError : function(data){
                console.log('Error', data);
                //NotificationService.showError(data.data.message);
                for(var i = 0; i < observers.length; i++){
                    observers[i](data.data.code, data.data.message, 'alert-warning');
                }
            }
        },
        addObserver: function(callback){
            observers.push(callback);
        }
    };
});


appUsers.factory('UsersServices', function ($resource, HttpResponseHandler) {

    function getResource() {
        return $resource(
            'http://localhost:3000/rest/contacts/:id',
            {id: '@id'},
            {
                'get': { method: 'GET', interceptor: HttpResponseHandler.interceptor},
                'save': {method: 'POST'},
                'list': {method: 'GET', isArray: true, interceptor: HttpResponseHandler.interceptor},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            }
        );
    }

    return {
        get: function (data) {
            return getResource().get(data);
        },
        list: function () {
            return getResource().list();
        },
        save: function (data) {
            return getResource().save(data);
        },
        update: function (data) {
            return getResource().update(data);
        },
        delete: function (data) {
            return getResource().delete(data);
        }
    };

});