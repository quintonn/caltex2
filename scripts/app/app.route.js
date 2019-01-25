(function (app)
{
    'use strict';

    app.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider)
    {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            '**']);

        $routeProvider.when("/",
            {
                template: function ()
                {
                    return "<view-container content='home-page'></view-container>";
                },
                resolve:
                {
                    xx: ['$rootScope', function ($rootScope)
                    {
                        $rootScope.$emit('changeHeading', "home");
                        webUtils.toggleClassInSet('home', 'not-on-home-page', 'on-home-page');
                    }]
                }
            }).when("/view/:path",
                {
                    template: function (routeInfo)
                    {
                        return "<view-container content='" + routeInfo.path + "'></view-container>";
                    },
                    resolve:
                    {
                        xx: ['$rootScope', '$location', function ($rootScope, $location)
                        {
                            var path = $location.path();
                            var parts = path.split("/");
                            path = parts[parts.length - 1];

                            $rootScope.$emit('changeHeading', path);

                            webUtils.toggleClassInSet('home', 'on-home-page', 'not-on-home-page');
                        }]
                    }
                }).when("/:path",
                    {
                        template: function (routeInfo)
                        {
                            return "<div class='content-container'><h1>Error, invalid path: " + routeInfo.path + "</h1></div>";
                        },
                        resolve:
                        {
                            xx: function ()
                            {
                                webUtils.toggleClassInSet('home', 'on-home-page', 'not-on-home-page');
                            }
                        }
                    });
    }]);
    
})(angular.module("CALTEX", ['ngRoute']));
