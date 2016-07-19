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
            this.interval = 1000 * 5;
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
                // console.log(response.data);
            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            angular.element(document).ready(function () {
                LiveviewService.requestLiveview().then(successCallback, errorCallback);
                refreshLiveview();
                console.log("Refreshed from Reloader");
            });
        };

        /**
         * @name: refreshLiveview
         * @desc: Rebuilds the Liveview after the document is loaded completely
         */
        var regCallbacks = [];
        var refreshLiveview = function () {
            angular.element(document).ready(function () {
                LiveviewService.buildLiveview();
                for(var i = 0; i < regCallbacks.length; i++){
                    regCallbacks[i].func();
                }
                console.log("my regcallbacks:", regCallbacks, regCallbacks.length);
            });
        };

        /**
         * @name start()
         * @desc Starts the reloader interval.
         */
        ReloadService.prototype.start = function () {
            this.reloader = $interval(requestLiveview, this.interval);
            this.running = true;
            // console.log("started Auto Reload");
        };

        /**
         * @name stop()
         * @desc Stops the reloader interval.
         */
        ReloadService.prototype.stop = function () {
            $interval.cancel(this.reloader);
            this.running = false;
            // console.log("stopped Auto Reload");
        };

        /**
         * @name restart()
         * @desc Restarts the reloader interval.
         */
        ReloadService.prototype.restart = function () {
            this.stop();
            this.start();
            // console.log("Restarted Auto Reload");
        };

        ReloadService.prototype.register = function(func) {
            regCallbacks.push({func: func, id: this.nextRegId});
            this.nextRegId++;
            return this.nextRegId-1;
        };

        ReloadService.prototype.deregister = function(callbackId) {
            for(var i = 0; i < regCallbacks.length; i++){
                if(regCallbacks[i].id === callbackId){
                    regCallbacks.splice(i);
                }
            }
        };

        return new ReloadService();
    }]);