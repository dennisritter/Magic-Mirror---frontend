angular.module('perna').service('LiveviewService', [
    function () {

        /**
         * @name: LiveviewService
         * @constructor
         * @desc:
         */
        var LiveviewService = function () {
            /**
             * @name liveview
             * @desc Describes the liveview and it´s modules
             * @type {{size: number, dom: (*|jQuery|HTMLElement), modules: Array}}
             */
            this.liveview = {
                size: 3,
                dom: $('#grid'),
                modules: []
            };
        };
        /**
         * @name: buildliveview()
         * @desc: Defines where to build the liveview within the DOM.
         */
        LiveviewService.prototype.buildLiveview = function () {
            this.liveview.dom.gridList({
                lanes: this.liveview.size
            });
            // console.log("built liveview.");
        };

        /**
         * @name: addModule
         * @desc: Adds a new module to the modules array
         */
        LiveviewService.prototype.addModule = function (module) {
            this.liveview.modules.push(module);
        };
        
        return new LiveviewService();
    }]);