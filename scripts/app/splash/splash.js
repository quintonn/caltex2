(function (app)
{
    'use strict';

    SplashController.$inject = ['menuService', '$rootScope', '$scope'];

    function SplashController(menuService, $rootScope, $scope)
    {
        var self = this;

        self.$onInit = function ()
        {
            
        };
    }

    app.component('splash', {
        templateUrl: 'scripts/app/splash/splash.html?v=' + main.version(),
        controller: SplashController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&",
        }
    });

})(angular.module("CALTEX"));
