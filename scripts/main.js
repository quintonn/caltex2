var main = (function ()
{
    function guid()
    {
        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    return {
        version: function () { return guid(); } // change this after making changes to anything, sometimes it is cached by browser
    }
})();

(function ()
{
    $('document').ready(function ()
    {
        angular.module("CALTEX", ['ngRoute']);

        svg4everybody();
    });
})();