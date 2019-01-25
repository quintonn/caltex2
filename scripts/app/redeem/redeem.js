(function (app)
{
    'use strict';

    RedeemController.$inject = ['menuService', '$scope', 'dialogService'];

    function RedeemController(menuService, $scope, dialogService)
    {
        var self = this;

        self.redeem = function ()
        {
            dialogService.showMessageBox("Info", "This will launch camera to allow taking picture of barcode");
        }
    }

    
    app.component('redeem', {
        templateUrl: function ()
        {
            return 'scripts/app/redeem/redeem.html?v=' + main.version();
        },
        controller: RedeemController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
