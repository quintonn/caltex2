(function (app)
{
    'use strict';

    menuProcessService.$inject = ['$location', 'dialogService', '$rootScope'];
    
    function menuProcessService($location, dialogService, $rootScope)
    {
        var service =
        {
            processUserAction: processUserAction,
            retrieveMenu: retrieveMenu
        };

        function login()
        {
            dialogService.showInputDialog("Login", "login", null, { closeButton: false, buttons: [{ label: "Login", id: 'login' }, { label: "Sign-Up", id: 'sign-up' }] }).then(function ()
            {
                console.log('logged in');
            });
        }

        function retrieveMenu()
        {
            var data = [
                //{
                //    "id": "login",
                //    "label": "Login",
                //    "cssClasses": "user-set require-user-not-present"
                //},
                {
                    "id": "notice-board",
                    "label": "Notice Board",
                    "cssClasses": ""
                },
                {
                    "id": "my-access",
                    "label": "My Access",
                    "cssClasses": ""
                },
                {
                    "id": "visitor-access",
                    "label": "Visitor Access",
                    "cssClasses": ""
                },
                {
                    "id": "facilities",
                    "label": "Facilities",
                    "cssClasses": ""
                },
                {
                    "id": "emergency",
                    "label": "Emergency",
                    "cssClasses": "emergency-menu"
                },
                {
                    "id": "inbox",
                    "label": "Inbox",
                    "cssClasses": ""
                },
                {
                    "id": "utility-manager",
                    "label": "Utility Manager",
                    "cssClasses": ""
                },
                {
                    "id": "calendar",
                    "label": "Calendar",
                    "cssClasses": ""
                },
                {
                    "id": "contact",
                    "label": "Contact Us",
                    "cssClasses": ""
                },
                {
                    "id": "faq-view",
                    "label": "FAQ",
                    "cssClasses": ""
                },
                {
                    "id": "terms",
                    "label": "Terms & Conditions",
                    "cssClasses": ""
                },
                {
                    "id": "use",
                    "label": "Terms of Use",
                    "cssClasses": ""
                },
                {
                    "id": "about-us",
                    "label": "About Us",
                    "cssClasses": ""
                },
                //{
                //    "id": "logout",
                //    "label": "Logout",
                //    "cssClasses": "user-set require-user-present"
                //}
            ];

            data.push({
                "id": "logout",
                "label": "Logout",
                "cssClasses": "user-set require-user-present"
            });

            var menus = [];

            var homeButtonClasses = "home-set require-not-home-page";
            if ($location.path() == "/")
            {
                homeButtonClasses += " on-home-page";
            }
            else
            {
                homeButtonClasses += " not-on-home-page";
            }

            menus.push(new menuItem('', 'Home', homeButtonClasses));

            for (var i = 0; i < data.length; i++)
            {
                var item = data[i];
                var menu = new menuItem(item.id, item.label, item.cssClasses);
                menus.push(menu);
            }
            console.log('returning menus');
            return Promise.resolve(menus);
        }

        function processUserAction(actionId, params)
        {
            if (actionId == "login")
            {
                login();
                return true;
            }
            else if (actionId == "profile")
            {
                dialogService.showInputDialog("Profile", "profile", params, { closeButton: false, buttons: [{ label: "Update Profile", id: 'update' }] }).then(function ()
                {
                    console.log('profile updated');
                });
            }
            else if (actionId == 'logout')
            {
                return true;
            }
            else if (actionId == 'terms')
            {
                //staticContentService.showStaticInfo("Terms and Conditions");
                return true;
            }
            else if (actionId == 'use')
            {
                //staticContentService.showStaticInfo("Terms of Use");
                return true;
            }
            else if (actionId == 'contact')
            {
                //staticContentService.showStaticInfo("Contact Us");
                return true;
            }
            else if (actionId == 'about-us')
            {
                //staticContentService.showStaticInfo("About Us");
            }
            else
            {
                return false;
            }
        }
        
        return service;
    }

    app.service('menuProcessService', menuProcessService);

})(angular.module("CALTEX"));
