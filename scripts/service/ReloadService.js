angular.module('perna').service('ReloadService', ['$interval', 'LiveviewService',
    function ($interval, LiveviewService) {

        /**
         * A Service to Reload the Liveview in a defines time.
         * @constructor
         */
        var ReloadService = function () {
            /**
             * @name interval
             * @desc The timeinterval the liveview will be reloaded from the api in milliseconds
             * @type {number}
             */
            this.interval = 5 * 1000;
            /**
             * @name running
             * @desc A flag to check whether the ReloadService is started or not.
             * @type {boolean}
             */
            this.running = false;
            this.nextRegId = 0;
        };

        /**
         * @name: requestLiveview
         * @desc: Request the Liveview after pageload is completed and build it immediatly.
         */
        var requestLiveview = function () {
            var successCallback = function (response) {
            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            angular.element(document).ready(function () {
                LiveviewService.setDataAttributes();
                LiveviewService.requestLiveview().then(successCallback, errorCallback);
                refreshLiveview();
            });
        };

        /**
         * @name: refreshLiveview
         * @desc: Rebuilds the Liveview after the document is loaded completely
         */
        var regCallbacks = [];
        var refreshLiveview = function () {
            LiveviewService.buildLiveview();
            for(var i = 0; i < regCallbacks.length; i++){
                regCallbacks[i].func();
            }
        };

        /**
         * @name start()
         * @desc Starts the reloader interval.
         */
        ReloadService.prototype.start = function () {
            this.reloader = $interval(requestLiveview, this.interval);
            this.running = true;
        };

        /**
         * @name stop()
         * @desc Stops the reloader interval.
         */
        ReloadService.prototype.stop = function () {
            $interval.cancel(this.reloader);
            this.running = false;
        };

        /**
         * @name restart()
         * @desc Restarts the reloader interval.
         */
        ReloadService.prototype.restart = function () {
            this.stop();
            this.start();
        };

        ReloadService.prototype.register = function(func) {
            regCallbacks.push({func: func, id: this.nextRegId});
            this.nextRegId++;
            return this.nextRegId-1;
        };

        ReloadService.prototype.deregister = function(callbackId) {
            for(var i = 0; i < regCallbacks.length; i++){
                if(regCallbacks[i].id === callbackId){
                    regCallbacks.splice(i, 1);
                }
            }
        };

        return new ReloadService();
    }]);