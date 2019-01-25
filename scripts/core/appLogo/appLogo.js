(function (app)
{
    'use strict';

    function AppLogoController()
    {
        var self = this;
    }

    app.component('appLogo', {
        templateUrl: function ()
        {
            return 'scripts/core/appLogo/appLogo.html?v=' + main.version();
        },
        controller: AppLogoController
    });

})(angular.module("CALTEX"));
