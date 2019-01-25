(function (app)
{
    'use strict';

    function dialogService()
    {
        var _addDialogAction = null;
        var _messageBoxAction = null;
        var _confirmationAction = null;
        var _promptAction = null;
        
        var service =
        {
            setAddDialogAction: setAddDialogAction,
            setMessageBoxAction: setMessageBoxAction,
            setConfirmationAction: setConfirmationAction,
            setPromptAction: setPromptAction,
            showMessageBox: showMessageBox,
            showConfirmation: showConfirmation,
            promptUserInput: promptUserInput,
            showInputDialog: showInputDialog
        };

        function setAddDialogAction(action)
        {
            _addDialogAction = action;
        }

        function setMessageBoxAction(action)
        {
            _messageBoxAction = action;
        }

        function setConfirmationAction(action)
        {
            _confirmationAction = action;
        }

        function setPromptAction(action)
        {
            _promptAction = action;
        }

        function showMessageBox(title, message, buttonLabel)
        {
            var buttonText = webUtils.getValueOrDefault(buttonLabel, "Ok");
            if (_messageBoxAction != null)
            {
                var result = _messageBoxAction(title, message, buttonText);
                return Promise.resolve(result);
            }
            else
            {
                window.alert(message);
                return Promise.resolve();
            }
        }

        function showConfirmation(title, message, yesButtonLabel, noButtonLabel)
        {
            var yes = webUtils.getValueOrDefault(yesButtonLabel, 'Yes');
            var no = webUtils.getValueOrDefault(noButtonLabel, 'No');

            if (_confirmationAction != null)
            {
                var result = _confirmationAction(title, message, yes, no);
                return Promise.resolve(result);
            }
            else
            {
                var result = window.confirm(message);
                return Promise.resolve(result);
            }
        }

        function promptUserInput(title, message, defaultValue, buttonLabel, mandatory)
        {
            if (buttonLabel == null || buttonLabel.trim().length == 0)
            {
                buttonLabel = null;
            }
            var buttonText = webUtils.getValueOrDefault(buttonLabel, "Ok", false);
            var result;
            if (_promptAction != null)
            {
                result = _promptAction(title, message, defaultValue, buttonText, mandatory);
            }
            else
            {
                result = window.prompt(message, defaultValue);
                if (result != null)
                {
                    result = result.trim();
                }
            }

            return Promise.resolve(result).then(function (res)
            {
                if (res != null)
                {
                    res = res.trim();
                }
                if (res != null && mandatory == true && (res == '' || res.length == 0))
                {
                    return showMessageBox("Error", "Input is mandatory and must be provided").then(function ()
                    {
                        return promptUserInput(title, message, defaultValue, buttonText, mandatory);
                    });
                }
                else
                {
                    return Promise.resolve(res);
                }
            });
        }

        function showInputDialog(title, component, parameters, options)
        {
            return new Promise(function (res, rej)
            {
                options = webUtils.getValueOrDefault(options, {}, false);
                options.closeCallback = function (xx)
                {
                    console.log('inside close callback for ' + title);
                    console.log(xx);
                    res(xx);
                };

                addDialog(new dialogItem(title, component, parameters, options));
            });
        }

        function addDialog(data)
        {
            if (_addDialogAction != null)
            {
                _addDialogAction(data);
            }
        }

        return service;
    }

    app.service('dialogService', dialogService);

})(angular.module("CALTEX"));
