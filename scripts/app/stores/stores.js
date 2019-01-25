(function (app)
{
    'use strict';

    StoresController.$inject = ['menuService', '$scope', 'dialogService'];

    function StoresController(menuService, $scope, dialogService)
    {
        var self = this;

        self.items = [];
        self.loading = false;

        self.selectItem = function (item)
        {
            //dialogService.showMessageBox("Info", "You clicked on " + item.Title);
            var url = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.1595356040802!2d18.51883331531399!3d-34.03977853538447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAyJzIzLjIiUyAxOMKwMzEnMTUuNyJF!5e0!3m2!1sen!2s!4v1548337447331" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>';
            return dialogService.showInputDialog("Filter", "store-map", {data: item}, null, true).then(function ()
            {
                console.log('x');
            });
        }

        self.$onInit = function ()
        {
            //for (var i = 0; i < 20; i++)
            //{
            //    self.items.push({ Title: "Test #" + i, Description: "Description testing " + i, HasRead: i % 2 == 0 });
            //}
            self.items.push({ Title: "5th Avenue Service Station", Description: "5th Avenue, Lotus River" });
            self.items.push({ Title: "9 Sefako Drive", Description: "9 Zambezi Drive, Rosslyn, Sinoville" });
            self.items.push({ Title: "A Club Service Station", Description: "273 Lynwood Road, Menlo Park" });
            self.items.push({ Title: "Abaqulusi Service Station", Description: "73 Church Street, Vryheid" });
            self.items.push({ Title: "Adam's Motor Clinic", Description: "170 Van Riebeeck Road, Ogies" });
            self.items.push({ Title: "AFR Ellis Motors", Description: "83 Soutpan Road, Onderstepoort" });
            self.items.push({ Title: "AJ Motors", Description: "2 Eufees Avenue, Nigel" });
            self.items.push({ Title: "Alan Hahn Motors", Description: "179 Catchcart road, Queenstown" });
            self.items.push({ Title: "Bothas Garage", Description: "11 Market Square, Graaf-Reinet" });
            self.items.push({ Title: "Brake Clutch and Radiator Centre", Description: "CNR Tautes & van Riebeeck Street, Groblersdal" });
            self.items.push({ Title: "Buffalo Pass Motors", Description: "1 Glencairn Street, Haven Hills" });
            self.items.push({ Title: "Buffelspark Vulstasie", Description: "Main Road, Marikana, Buffelspoort" });
            self.items.push({ Title: "Bulwer Park Service Station", Description: "159 Bulwer Road, Durban" });
        }
    }

    
    app.component('stores', {
        templateUrl: function ()
        {
            return 'scripts/app/stores/stores.html?v=' + main.version();
        },
        controller: StoresController,
        bindings:
        {
            parameters: "<"
        }
    });

})(angular.module("CALTEX"));
