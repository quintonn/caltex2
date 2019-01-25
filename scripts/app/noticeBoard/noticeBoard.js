(function (app)
{
    'use strict';

    NoticeBoardController.$inject = ['menuService', '$scope', 'dialogService'];

    function NoticeBoardController(menuService, $scope, dialogService)
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
                self.items.push({ Title: "Notice #" + i, Description: "Notice Description testing " + i, HasRead: i % 2 == 0, longInfo: "this is more information about this item and it can be very long" });
            }

            self.loading = false;
        }
    }

    
    app.component('noticeBoard', {
        templateUrl: function ()
        {
            return 'scripts/app/noticeBoard/noticeBoard.html?v=' + main.version();
        },
        controller: NoticeBoardController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
