(function (app)
{
    'use strict';

    FooterController.$inject = ['menuService', 'dialogService'];

    function FooterController(menuService, dialogService)
    {
        var self = this;

        self.itemClick = function (menu)
        {
            if (menu == 'about-us')
            {
                //staticContentService.showStaticInfo("About Us");
            }
            else
            {
                menuService.showView(menu);
            }
        }
    }

    app.component('footer', {
        templateUrl: function ()
        {
            return 'scripts/app/footer/footer.html?v=' + main.version();
        },
        controller: FooterController
    });

})(angular.module("CALTEX"));
