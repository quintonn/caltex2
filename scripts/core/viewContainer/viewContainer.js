(function (app)
{
    'use strict';

    ViewContainerController.$inject = [];

    function ViewContainerController()
    {
        var self = this;

        self.heading = "Heading goes here";
    }

    app.directive('viewContainer', ['$compile', function($compile) {
        return {
            scope:
            {
                parameters: "<parameters",
                data: "=data",
                closeDialog: "&",
            },
            link: function (scope, element, attrs)
            {
                var parameterString = "parameters='parameters' data='data' close-dialog='closeDialog({result:result})'";

                var componentString = "<XXX " + parameterString + " ></XXX>";
                
                componentString = componentString.replace(/XXX/g, attrs.content);

                var component = "<div class='content-container'>" + componentString + "</div>";
                element.append(component);
                $compile(element.contents())(scope);
            },
            controller: ViewContainerController
        };
    }]);

})(angular.module("CALTEX"));
