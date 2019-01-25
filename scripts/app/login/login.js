(function (app)
{
    'use strict';

    LoginController.$inject = ['dialogService', 'userService', '$rootScope'];

    function LoginController(dialogService, userService, $rootScope)
    {
        var self = this;

        self.email = 'q10athome@gmail.com';
        self.password = 'password';
        //self.email = '';
        //self.password = '';

        self.emailError = '';
        self.passwordError = '';

        self.loading = false;

        self.forgotPassword = function ()
        {
            console.log('forgot password clicked');
        }

        self.signupClick = function ()
        {
            dialogService.showInputDialog("Sign Up", "sign-up", null, null, true).then(function (resp)
            {
                //TODO: not sure if we want this because email is not verified.
                if (resp != null)
                {
                    self.email = resp.email;
                    self.password = resp.password;
                }
            });
        }

        self.$onInit = function ()
        {
            if (typeof self.parameters != 'undefined')
            {
                //self.parameters.buttonCallback = buttonCallback;
            }
        }

        self.loginClick = function ()
        {
            var valid = true;
            self.loading = true;
            if (self.email == '' || self.email.length == 0)
            {
                self.emailError = 'Email is mandatory';
                valid = false;
            }
            if (self.password == '' || self.password.length == 0)
            {
                self.passwordError = 'Password is mandatory';
                valid = false;
            }

            if (valid)
            {
                return userService.initialize().then(function (res)
                {
                    console.log('userService.initialize.then');
                    console.log(res);
                    self.loading = false;

                    self.closeDialog();
                });
            }
            else
            {
                self.loading = false;
            }
        }

        //var buttonCallback = function (id)
        //{
        //    if (id == 'login')
        //    {
        //        self.loginClick();
        //    }
        //    else if (id == 'sign-up')
        //    {
        //        dialogService.showInputDialog("Sign-Up", "sign-up", null, { buttons: [{ label: "Submit", id: 'submit' }, { label: "Cancel", id: 'cancel' }] });
        //    }
        //    else
        //    {
        //        alert('unknown button id ' + id);
        //    }
        //}
    }

    app.component('login', {
        templateUrl: function ()
        {
            return 'scripts/app/login/login.html?v=' + main.version();
        },
        controller: LoginController,
        bindings:
        {
            parameters: "<",
            closeDialog: "&"
        }
    });

})(angular.module("CALTEX"));
