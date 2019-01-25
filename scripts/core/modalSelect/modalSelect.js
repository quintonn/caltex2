(function (app)
{
    'use strict';

    //ModalSelectController.$inject = ['dialogService'];

    function ModalSelectController()
    {
        var self = this;
        self.options = [];

        self.$onInit = function ()
        {
            if (typeof self.parameters != 'undefined')
            {
                var selectedItems = [];
                if (self.parameters.allowMultiple == true)
                {
                    var currentValue = webUtils.getValueOrDefault(self.parameters.value, [], false);
                    for (var i = 0; i < currentValue.length; i++)
                    {
                        selectedItems.push(currentValue[i].Id);
                    }
                }

                self.options = [];
                
                if (self.parameters.allowMultiple == true)
                {
                   self.options.push({ Id: "All", Value: "All" });
                }

                for (var i = 0; i < self.parameters.options.length; i++)
                {
                    var item = self.parameters.options[i];
                    var selected = selectedItems.indexOf(item.Id) > -1;
                    self.options.push({ Id: item.Id, Value: item.Value, selected: selected });
                }

                if (self.parameters.allowMultiple == true)
                {
                    checkIfAllSelected();
                }
            }
        }

        self.selectItem = function (item)
        {
            if (self.parameters.allowMultiple != true)
            {
                self.closeDialog({ result: item });
            }
            else if (item.Id == "All")
            {
                item.selected = !item.selected;
                for (var i = 1; i < self.options.length; i++)
                {
                    self.options[i].selected = item.selected;
                }
            }
            else
            {
                item.selected = !item.selected;
                checkIfAllSelected();
            }
        }

        function checkIfAllSelected()
        {
            if (self.options == null || self.options.length < 2)
            {
                return;
            }

            var selected = self.options[1].selected == true;
            for (var i = 2; i < self.options.length; i++)
            {
                if (self.options[i].selected != selected)
                {
                    self.options[0].selected = false;
                    return;
                }
            }

            self.options[0].selected = selected;
        }

        self.submit = function ()
        {
            var results = [];
            var start = 0;
            if (self.parameters.allowMultiple == true)
            {
                start = 1;
            }
            for (var i = start; i < self.options.length; i++)
            {
                if (self.options[i].selected == true)
                {
                    results.push(self.options[i]);
                }
            }
            self.closeDialog({ result: results });
        }

        self.backClick = function ()
        {
            self.closeDialog();
        }
    }

    app.component('modalSelect', {
        templateUrl: function ()
        {
            return 'scripts/core/modalSelect/modalSelect.html?v=' + main.version();
        },
        controller: ModalSelectController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&",
        }
    });

})(angular.module("CALTEX"));
