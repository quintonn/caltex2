(function (app)
{
    'use strict';

    function SvgButtonController()
    {
        var self = this;

        self.$onInit = function ()
        {
            if (typeof self.useVertical == 'undefined')
            {
                self.useVertical = false;
            }
        }
    }

    app.component('svgButton', {
        templateUrl: 'scripts/core/svgButton/svgButton.html?v=' + main.version(),
        controller: SvgButtonController,
        bindings:
        {
            useVertical: "<",
            xlinkhref: "@",
            viewBox: "@",
        }
    });

})(angular.module("CALTEX"));
