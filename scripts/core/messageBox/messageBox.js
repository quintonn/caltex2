(function (app)
{
    'use strict';

    MessageBoxController.$inject = ['dialogService'];

    function MessageBoxController(dialogService)
    {
        var self = this;
        self.title = '';
        self.message = '';
        self.buttons = [];
        self.defaultValue = '';
        self.mandatory = false;
        self.isInput = false;
        self.inputValue = '';
        self.inputError = '';

        self.$onInit = function ()
        {
            if (typeof self.parameters != 'undefined')
            {
                self.title = self.parameters.title;
                self.message = self.parameters.message;
                self.buttons = self.parameters.buttons;
                self.defaultValue = webUtils.getValueOrDefault(self.parameters.defaultValue, '', false);
                self.mandatory = webUtils.getValueOrDefault(self.parameters.mandatory, false, false);
                self.isInput = webUtils.getValueOrDefault(self.parameters.isInput, false, false);
            }
        }

        self.buttonClick = function (id)
        {
            if (id == 'yes')
            {
                self.closeDialog({ result: true });
            }
            else if (id == 'no')
            {
                self.closeDialog({ result: false });
            }
            else if (id == "ok")
            {
                if (self.isInput == true)
                {
                    if (self.mandatory == true && self.inputValue.trim().length == 0)
                    {
                        self.inputError = "Input is mandatory";
                    }
                    else
                    {
                        self.closeDialog({ result: self.inputValue });
                    }
                }
            }
            else
            {
                self.closeDialog({ result: null });
            }
        }
    }

    app.component('messageBox', {
        templateUrl: function ()
        {
            return 'scripts/core/messageBox/messageBox.html?v=' + main.version();
        },
        controller: MessageBoxController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&"
        }
    });

})(angular.module("CALTEX"));
