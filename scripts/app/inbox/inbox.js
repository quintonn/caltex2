(function (app)
{
    'use strict';

    InboxController.$inject = ['menuService', '$scope', 'dialogService'];

    function InboxController(menuService, $scope, dialogService)
    {
        var self = this;

        self.items = [];
        self.loading = true;

        self.selectItem = function (item)
        {
            dialogService.showMessageBox("Info", "You clicked on " + item.Title);
        }

        self.$onInit = function ()
        {
            self.loading = true;

            for (var i = 0; i < 20; i++)
            {
                self.items.push({ Title: "Inbox #" + i, Description: "Description testing " + i, HasRead: i % 2 == 0 });
            }

            self.loading = false;
        }
    }

    
    app.component('inbox', {
        templateUrl: function ()
        {
            return 'scripts/app/inbox/inbox.html?v=' + main.version();
        },
        controller: InboxController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
