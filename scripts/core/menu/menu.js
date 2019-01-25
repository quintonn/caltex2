(function (app)
{
    'use strict';

    MenuController.$inject = ['menuService', '$scope', '$rootScope', '$location'];

    function MenuController(menuService, $scope, $rootScope, $location)
    {
        var self = this;
        self.username = '';

        self.loading = false;
        self.menus = [];

        self.closeClick = function ()
        {
            layout.toggleMenu();
        }

        self.menuClick = function (menu)
        {
            var menuNode = document.getElementById('menuContainer');
            var menuStyle = window.getComputedStyle(menuNode);
            if (menuStyle.position == "absolute") // We're on a small device
            {
                layout.toggleMenu();
            }

            menuService.menuClick(menu);
        }

        function loadMenu()
        {
            self.loading = true;
            menuService.getMenu().then(function (results)
            {
                self.menus = results;
                self.loading = false;
                
                $scope.$apply();
            });
        }

        $rootScope.$on('loggedOut', function (evt, data)
        {
            //TODO: maybe i shouldn't rely on app.route for the login dialog stuff..??
            $location.path("/").search({ x: webUtils.guid() }); // this makes sure app.route is triggered and login screen is shown
            $scope.$apply();
        });

        $rootScope.$on('updateUserInfo', function (evt, data)
        {
            self.username = data;
        });

        loadMenu();
    }

    app.component('menu', {
        templateUrl: function ()
        {
            return 'scripts/core/menu/menu.html?v=' + main.version();
        },
        controller: MenuController
    });

})(angular.module("CALTEX"));
