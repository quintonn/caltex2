(function (app)
{
    'use strict';

    EmergencyController.$inject = ['menuService', '$scope', 'dialogService'];

    function EmergencyController(menuService, $scope, dialogService)
    {
        var self = this;

        self.loading = false;
    }

    
    app.component('emergency', {
        templateUrl: function ()
        {
            return 'scripts/app/emergency/emergency.html?v=' + main.version();
        },
        controller: EmergencyController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
