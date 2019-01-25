
(function (app)
{
    'use strict';

    FullscreenDialogContainerController.$inject = ['$scope', 'dialogService'];

    function FullscreenDialogContainerController($scope, dialogService)
    {
        var self = $scope;

        self.fullscreenDialogs = [];

        self.addDialog = function (data)
        {
            setTimeout(function ()
            {
                self.fullscreenDialogs.push(data);

                $scope.$apply();
            }, 100); // without this, the dialogs don't show. Don't like this much. Try and fix
        }

        self.closeFullscreenDialog = function (result)
        {
            var closeCallback = getOptionValue(getLast(self.fullscreenDialogs), 'closeCallback', null);

            if (closeCallback != null)
            {
                closeCallback(result);
            }
            else
            {
                webUtils.log('Close callback on dialog ' + getLast(self.fullscreenDialogs).title + ' is not set', 1);
            }

            self.fullscreenDialogs.splice(self.fullscreenDialogs.length - 1, 1);

            setTimeout(function ()
            {
                $scope.$apply();
            }, 0);
        }

        self.getFullModalClass = function ()
        {
            if (self.fullscreenDialogs.length == 0)
            {
                return "no-dialog";
            }
            else
            {
                return "show-dialog";
            }
        }

        dialogService.setAddDialogAction(self.addDialog);
        dialogService.setMessageBoxAction(function (title, message, buttonLabel)
        {
            return new Promise(function (res, rej)
            {
                var dlg = new dialogItem(title, 'message-box', { title: title, message: message, buttons: [{ label: buttonLabel, id: 'yes' }] }, { closeCallback: res });
                self.addDialog(dlg);
            });
        });
        dialogService.setConfirmationAction(function (title, message, yesButtonLabel, noButtonLabel)
        {
            return new Promise(function (res, rej)
            {
                var dlg = new dialogItem(title, 'message-box', { title: title, message: message, buttons: [{ label: yesButtonLabel, id: 'yes' }, { label: noButtonLabel, id: 'no' }] }, { closeCallback: res });
                self.addDialog(dlg);
            });
        });
        dialogService.setPromptAction(function (title, message, defaultValue, buttonLabel, mandatory)
        {
            return new Promise(function (res, rej)
            {
                var dlg = new dialogItem(title, 'message-box', { title: title, message: message, defaultValue: defaultValue, mandatory: mandatory, isInput: true, buttons: [{ label: buttonLabel, id: 'ok' }] }, { closeCallback: res });
                self.addDialog(dlg);
            });
        });
    }

    app.directive('fullscreenDialogContainer', function ()
    {
        return {
            templateUrl: function (elem, attr)
            {
                return 'scripts/core/fullscreenDialogContainer/fullscreenDialogContainer.html?v=' + main.version();
            },
            controller: FullscreenDialogContainerController
        };
    });

    function getLast(dialogs)
    {
        if (dialogs == null || dialogs.length == 0)
        {
            return {};
        }
        return dialogs[dialogs.length - 1];
    }

    function getOptionValue(item, name, defaultValue)
    {
        var parts = name.split('.');
        var firstPart = parts[0];

        if (typeof item != 'undefined' && item != null && item.options != null)
        {
            var result = item.options[firstPart];

            if (typeof result != 'undefined')
            {
                if (parts.length > 1)
                {
                    return getValueFromObject(result, parts.splice(0, 1).join('.'), defaultValue);
                }
                else
                {
                    return result;
                }
            }
        }
        if (typeof defaultValue != 'undefined')
        {
            return defaultValue;
        }
        return null;
    }

    function getValueFromObject(item, path, defaultValue)
    {
        var currentItem = item;
        var parts = path.split('.');

        for (var i = 0; i < parts.length; i++)
        {
            if (currentItem == null)
            {
                break;
            }
            var currentPath = parts[i];

            var loopItem = currentItem[currentPath];

            if (typeof loopItem != 'undefined')
            {
                currentItem = loopItem;
            }
            else
            {
                currentItem = null;
            }
        }

        if (currentItem != null)
        {
            return currentItem;
        }
        else
        {
            if (typeof defaultValue != 'undefined')
            {
                return defaultValue;
            }
            return null;
        }
    }

})(angular.module("CALTEX"));
