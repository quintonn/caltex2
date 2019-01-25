(function (app)
{
    'use strict';

    function BusyIndicatorController()
    {
        var self = this;
    }

    app.component('busyIndicator', {
        templateUrl: 'scripts/core/busyIndicator/busyIndicator.html?v=' + main.version(),
        controller: BusyIndicatorController,
        bindings:
        {
            loading: "<"
        }
    });

})(angular.module("CALTEX"));
