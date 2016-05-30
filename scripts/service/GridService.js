angular.module('perna').service('GridService', [
    function () {

        /**
         * @name: GridService
         * @constructor
         * @desc:
         */
        var GridService = function () {
            this.grid = {
                size: 3,
                dom: $('#grid'),
                modules: [
                    {
                        size: {w: 1, h: 1},
                        position: {x: 0, y: 0,},
                        id: 0,
                        type: "calendar"
                    }
                ]
            };
        };
        /**
         * @name: buildGrid()
         * @desc: Defines where to build the grid within the DOM.
         */
        GridService.prototype.buildGrid = function () {
            this.grid.dom.gridList({
                lanes: this.grid.size
            });
            console.log("built grid.");
        };

        /**
         * @name: addModule
         * @desc: Adds a new module to the modules array
         */
        GridService.prototype.addModule = function (module) {
            //generate module-ID
            //module.id = NEW MODULE ID
            this.grid.modules.push(module);
            console.log("Added module to Gridservice.grid.modules");
            console.log("modules: ", this.grid.modules);
        };

        /* Hier brauchen wir -möglicherweise- noch eine update Array-Methode,
         die die Elemente aus dem DOM zieht und sie im item array speichert.
         So klappts auf jeden fall nicht:*/

        // var updateItems = function(){
        //     var liste = $('#grid li');
        //     liste.each(function(i, element){
        //         var element = $(element);
        //         items[i].w = element.attr('data-w');
        //         items[i].h = element.attr('data-h');
        //         items[i].x = element.attr('data-x');
        //         items[i].y = element.attr('data-y');
        //     });
        // };
        return new GridService();
    }]);