(function (app)
{
    'use strict';

    MainContainerController.$inject = ['menuService', '$location', '$rootScope'];


    function MainContainerController(menuService, $location, $rootScope)
    {
        var self = this;

        var container = document.getElementById('mainApp');
        layout.setup(container);

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

    app.component('mainContainer', {
        templateUrl: function ()
        {
            return 'scripts/core/mainContainer/mainContainer.html?v=' + main.version();
        },
        controller: MainContainerController,
    });

})(angular.module("CALTEX"));
