/**
 * Created by osnircunha on 11/6/15.
 */
angular.module('app.users', ['ngResource']).factory('UsersServices', function ($resource) {
    return $resource('http://localhost:3000/rest/contacts/:id',
        {
            id: '@id'
        },
        {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'list': {method: 'GET', isArray: true},
            'update': {method: 'PUT'},
            'delete': {method: 'DELETE'}
        }
    );
});