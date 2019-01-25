(function (app)
{
    'use strict';

    HomePageController.$inject = ['menuService', '$rootScope', '$scope', 'dialogService'];

    var firstTime = true;

    function HomePageController(menuService, $rootScope, $scope, dialogService)
    {
        var self = this;

        self.loading = false;

        self.unreadNews = 0;

        self.profile = 'none';

        self.iconClick = function (viewName)
        {
            menuService.showView(viewName);
        };

        $rootScope.$on('userType', function (evt, data)
        {
            self.profile = data;
            $scope.$apply();
        });

        self.$onInit = function ()
        {
            if (firstTime == true)
            {
                firstTime = false;
                return dialogService.showInputDialog("Filter", "splash", {}, null, true).then(function (ageGroup)
                {
                });
            }
        };
    }

    app.component('homePage', {
        templateUrl: 'scripts/app/homePage/homePage.html?v=' + main.version(),
        controller: HomePageController
    });

})(angular.module("CALTEX"));
