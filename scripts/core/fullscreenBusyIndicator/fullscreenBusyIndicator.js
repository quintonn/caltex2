(function (app)
{
    'use strict';

    var dateFormat = "DD MM YYYY";

    FullscreenBusyIndicatorController.$inject = ['dialogService', 'userService', '$scope', 'menuService'];

    function FullscreenBusyIndicatorController(dialogService, userService, $scope, menuService)
    {
        var self = this;

        self.loading = false;

        self.$onInit = function ()
        {
            self.loading = true;

            self.parameters.work().then(function (x)
            {
                self.closeDialog();
            });
        }
    }

    app.component('fullscreenBusyIndicator', {
        templateUrl: function ()
        {
            return 'scripts/core/fullscreenBusyIndicator/fullscreenBusyIndicator.html?v=' + main.version();
        },
        controller: FullscreenBusyIndicatorController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&"
        }
    });

})(angular.module("CALTEX"));
