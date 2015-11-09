/**
 * Created by osnircunha on 11/8/15.
 */

angular.module('modal.service', ['ngAnimate', 'ui.bootstrap']).factory('ModalService', function ($modal) {
    return {
        createModal: function(resolve, template, controller, scope){
            $modal.open({
                resolve: resolve,
                templateUrl: template,
                controller: controller,
                scope: scope,
                size: 'sm'
            });
        }
    };
});