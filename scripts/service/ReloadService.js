angular.module('perna').service('ReloadService', ['$interval', 'LiveviewService',
    function ($interval, LiveviewService) {

        var ReloadService = function () {
            this.interval = 1000 * 5;
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
        var refreshLiveview = function () {
            angular.element(document).ready(function () {
                LiveviewService.buildLiveview();
            });
        };

        ReloadService.prototype.start = function () {
            this.reloader = $interval(requestLiveview, this.interval);
            console.log("started Auto Reload");
        };

        ReloadService.prototype.stop = function () {
            $interval.cancel(this.reloader);
        };
        ReloadService.prototype.restart = function () {
            this.stop();
            this.start();
            console.log("timer restarted");
        };

        return new ReloadService();
    }]);