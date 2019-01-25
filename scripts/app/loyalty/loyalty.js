(function (app)
{
    'use strict';

    LoyaltyController.$inject = ['menuService', '$scope', 'dialogService'];

    function LoyaltyController(menuService, $scope, dialogService)
    {
        var self = this;
    }

    
    app.component('loyalty', {
        templateUrl: function ()
        {
            return 'scripts/app/loyalty/loyalty.html?v=' + main.version();
        },
        controller: LoyaltyController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
