(function (app)
{
    'use strict';

    userService.$inject = ['$rootScope', 'dialogService'];

    function userService($rootScope, dialogService)
    {
        var service =
        {
            retrieveProfile: retrieveProfile,
            register: register,
            resetPassword: resetPassword,
            verifyCompleteProfile: verifyCompleteProfile,
            initialize: initialize
        };

        function verifyCompleteProfile()
        {
            return Promise.resolve();
        }

        $rootScope.$on('loggedOut', function (evt, data)
        {
            
        });

        function initialize()
        {
            return Promise.resolve();
        }

        function retrieveProfile(deviceId)
        {
            return new Promise.resolve({});
        }

        function register(firstName, lastName, email, password, passwordConfirm)
        {
            return Promise.resolve();
        }

        function resetPassword(email)
        {
            return Promise.resolve();
        }

        function setup()
        {
            initialize()
                .then(function (resp)
                {
                    console.log('setting system to initialized');

                }).catch(function (err)
                {
                    console.log('setting system to initialized true with error');
                    console.log(err);
                });
        }

        setup();

        return service;
    }

    app.service('userService', userService);

})(angular.module("CALTEX"));
