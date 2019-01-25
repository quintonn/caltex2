(function (app)
{
    'use strict';

    BunnyController.$inject = ['menuService', '$scope', 'dialogService'];

    function BunnyController(menuService, $scope, dialogService)
    {
        var self = this;

        
    }

    
    app.component('bunny', {
        templateUrl: function ()
        {
            return 'scripts/app/bunny/bunny.html?v=' + main.version();
        },
        controller: BunnyController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
