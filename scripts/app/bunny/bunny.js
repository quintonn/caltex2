(function (app)
{
    'use strict';

    BunnyController.$inject = ['menuService', '$scope', 'dialogService'];

    function BunnyController(menuService, $scope, dialogService)
    {
        var self = this;

        console.log('x');
    }

    
    app.component('caltexRabbit', {
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
