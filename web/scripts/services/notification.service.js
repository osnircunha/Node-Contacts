/**
 * Created by osnircunha on 11/8/15.
 */
var appNotification = angular.module('app.notification',[]);

appNotification.factory('NotificationService', function () {
    var notification = {};

    notification.showError = function (msg) {
        createNotification('Error', msg, 'error');
    };

    notification.showSuccess = function (msg) {
        createNotification('Success', msg);
    };

    function createNotification(title, msg, type){
        new PNotify({
            title: title,
            text: msg,
            type: type | 'success',
            buttons: {
                sticker: false,
                closer_hover: true
            },
            history: {
                history: true
            }
        });
    }
    return notification;
});