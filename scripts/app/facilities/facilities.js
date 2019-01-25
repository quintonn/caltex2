(function (app)
{
    'use strict';

    FacilitiesController.$inject = ['menuService', '$scope', 'dialogService'];

    function FacilitiesController(menuService, $scope, dialogService)
    {
        var self = this;

        self.loading = false;
    }

    
    app.component('facilities', {
        templateUrl: function ()
        {
            return 'scripts/app/facilities/facilities.html?v=' + main.version();
        },
        controller: FacilitiesController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
