angular.module('perna').service('LiveviewService', ['$http', '$q', 'api',
    function ($http, $q, api) {

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
             * example for a module in the modules array below
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
        };

        /**
         * @name: requestLiveview
         * @desc: Sends a GET-Request to the Perna-Api to receive the persisted liveview
         * @returns {Promise}
         */
        LiveviewService.prototype.requestLiveview = function () {
            var _liveviewService = this;
            var defer = $q.defer();
            $http({
                url: 'http://api.perna.dev/v1/modules',
                method: 'GET',
            })
                .success(function (response) {
                    _liveviewService.liveview.modules = angular.copy(response.data);
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        /**
         * @name: persist
         * @desc: Calls persistLiveview
         * @note: Frontend Service-Api function call from Controllers.
         */
        LiveviewService.prototype.persist = function () {
            var successCallback = function (response) {
                // console.log("Persisted the current liveview",response);
            };
            var errorCallback = function (response) {
                console.error("Persisting the current liveview failed: ", response.error);
            };
            this.persistLiveview().then(successCallback, errorCallback);
        };

        /**
         * @name persistLiveview
         * @desc Sends the current Liveview state to the Perna-Api
         * @param typeData {}   necessary Data for a module type
         */
        LiveviewService.prototype.persistLiveview = function () {
            var _liveviewService = this;
            var defer = $q.defer();
            $http({
                url: 'http://api.perna.dev/v1/modules',
                method: 'PUT',
                data: _liveviewService.liveview.modules
            })
                .success(function (response) {
                    _liveviewService.liveview.modules = response.data;
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        /**
         * @name: addModule
         * @desc: Adds a new module to the modules array
         */
        LiveviewService.prototype.addModule = function (module) {
            this.liveview.modules.push(module);
        };

        /**
         * @name deleteModule
         * @desc: Deletes the given module from the liveview.modules Array and sends a DELETE-Request
         * to the Perna-Api afterwards.
         * @param module    The module to delete
         * @returns {Promise}
         */
        LiveviewService.prototype.deleteModule = function (module) {
            var defer = $q.defer();
            // Find index of the module to delete
            for (var i = 0; i < this.liveview.modules.length; ++i) {
                // If a module is created and never saved, it won´t have the key 'id' yet.
                // The 'id' is only present when the module has been saved at least once before.
                // In that case, the module isn´t present in the database and can´t be deleted, so it will be removed
                // from the liveview.modules Array and the promise gets resolved and returned immediately.
                if (!('id' in module) && !('id' in this.liveview.modules[i])) {
                    this.liveview.modules.splice(i);
                    defer.resolve();
                    return defer.promise;
                } else if (this.liveview.modules[i].id === module.id) {
                    this.liveview.modules.splice(i);
                }
            }
            $http({
                url: 'http://api.perna.dev/v1/modules/' + module.id,
                method: 'DELETE',
            })
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        return new LiveviewService();
    }]);