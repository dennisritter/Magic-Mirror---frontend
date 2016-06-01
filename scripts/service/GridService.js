angular.module('perna').service('GridService', [
    function () {

        /**
         * @name: GridService
         * @constructor
         * @desc:
         */
        var GridService = function () {
            /**
             * @name grid
             * @desc Describes the grid and it´s modules
             * @type {{size: number, dom: (*|jQuery|HTMLElement), modules: Array}}
             */
            this.grid = {
                size: 3,
                dom: $('#grid'),
                modules: []
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
            // console.log("built grid.");
        };

        /**
         * @name: addModule
         * @desc: Adds a new module to the modules array
         */
        GridService.prototype.addModule = function (module) {
            this.grid.modules.push(module);
        };
        
        return new GridService();
    }]);