(function (app)
{
    'use strict';

    var dateFormat = "DD MM YYYY";

    ProfileController.$inject = ['dialogService', '$scope', 'menuService'];

    function ProfileController(dialogService, $scope, menuService)
    {
        var self = this;

        self.loading = false;

        self.playerId = '';

        self.name = '';
        self.surname = '';
        self.inputs = [];
        
        self.errors = true;

        self.allErrors = function ()
        {
            return '';
        }

        self.isChecked = false;
        self.check = function ()
        {
            self.isChecked = !self.isChecked;
        }

        function checkNotNull(fieldName)
        {
            if (self[fieldName] == null || self[fieldName].trim().length == 0)
            {
                self[fieldName + 'Error'] = fieldName + ' is mandatory';
                self.errors = true;
            }
            else
            {
                clearError(fieldName);
            }
        }

        function clearError(fieldName)
        {
            self[fieldName + 'Error'] = '';
        }

        self.logout = function ()
        {
            self.closeDialog();
            menuService.menuClick({ id: "logout" });
        }

        self.backClick = function ()
        {
            self.closeDialog();
        }
    }

    app.component('profile', {
        templateUrl: function ()
        {
            return 'scripts/app/profile/profile.html?v=' + main.version();
        },
        controller: ProfileController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&",
        }
    });

    function getInputValue(inputItem, datePickerAvailable)
    {
        if (inputItem.type == "Selection")
        {
            if (inputItem.options.allowMultiple == true)
            {
                var chosenValues = webUtils.getValueOrDefault(inputItem.value, [], false);
                var results = '';
                for (var i = 0; i < chosenValues.length; i++)
                {
                    results = results + chosenValues[i].Id + ",";
                }
                return results;
            }
            else
            {
                var chosenOption = webUtils.getValueOrDefault(inputItem.value, {}, false);
                return webUtils.getValueOrDefault(chosenOption.Id, '');
            }
        }
        else if (inputItem.type == 'Date')
        {
            var date;
            if (datePickerAvailable == true)
            {
                //date = moment(question.Answer, dateFormat);
                date = inputItem.value;
            }
            else
            {
                date = new Date(inputItem.value);
                date = moment(date).format(dateFormat);
            }

            //return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            //return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            
            return date;
        }
        else
        {
            return inputItem.value;
        }
    }

    function dynamicInput(id, label, type, mandatory, defaultValue, options)
    {
        var self = this;
        self.id = id;
        self.value = defaultValue;
        self.label = label;
        self.type = type;
        self.mandatory = mandatory;
        self.options = options;

        self.inputError = function ()
        {
            if (self.mandatory == true && webUtils.getValueOrDefault(self.value, '', false) == '')
            {
                if (self.type == "Selection" && self.options.allowMultiple == true)
                {
                    for (var i = 0; i < self.options.options.length; i++)
                    {
                        if (self.options.options[i].selected == true)
                        {
                            return '';
                        }
                    }
                }
                return self.label + ' is mandatory';
            }
            else if (self.type == "Number")
            {
                if (self.value == null) //TODO: this does not allow empty number fields, i.e. when not mandatory
                {
                    return 'Invalid number entered';
                }
                else
                {
                    return '';
                }
            }
            else
            {
                return '';
            }
        }
    }

})(angular.module("CALTEX"));
