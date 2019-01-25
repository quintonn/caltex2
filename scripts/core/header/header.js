(function (app)
{
    'use strict';

    HeaderController.$inject = ['$rootScope', '$scope', '$location', 'menuService'];

    function HeaderController($rootScope, $scope, $location, menuService)
    {
        var self = this;

        self.showBack = function ()
        {
            return self.heading != 'home'; // TODO: not the best way to decide if back button should be shown or not
        }

        self.heading = cleanPath($location.path());

        self.menuClick = function ()
        {
            layout.toggleMenu();
        }

        self.backClick = function ()
        {
            menuService.goBack();
        }

        $rootScope.$on('changeHeading', function (evt, data)
        {
            self.heading = cleanPath(data);
        });
    }

    function cleanPath(path)
    {
        var parts = path.split("/");
        path = parts[parts.length - 1];

        path = path.replace("/", "")
            .replace("-", " ")
            .trim();
        if (path.length == 0)
        {
            return "home";
        }
        return path;
    }

    app.component('header', {
        templateUrl: function ()
        {
            return 'scripts/core/header/header.html?v=' + main.version();
        },
        controller: HeaderController
    });

})(angular.module("CALTEX"));
