(function (app)
{
    'use strict';

    StoreMapController.$inject = ['menuService', '$scope', 'dialogService'];

    function StoreMapController(menuService, $scope, dialogService)
    {
        var self = this;
        self.loading = false;

        self.item = {};

        self.$onInit = function ()
        {
            self.loading = true;
            
            self.item = self.parameters.data;
            setTimeout(function ()
            {
                self.loading = false;
                $scope.$apply();
            }, 2000);
        }
    }

    
    app.component('storeMap', {
        templateUrl: function ()
        {
            return 'scripts/app/storeMap/storeMap.html?v=' + main.version();
        },
        controller: StoreMapController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&",
        }
    });

})(angular.module("CALTEX"));
