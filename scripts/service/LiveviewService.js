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
             * example for a module in the modules array
             *     modules = [{
                        size: {
                            w: 1,
                            h: 1
                        },
                        position: {
                            x: 0,
                            y: 0,
                        },
                        type: undefined,
                        typeData: {}
                  }];
             */
            this.liveview = {
                size: 3,
                dom: $('#grid'),
                modules: []
            };
        };

        LiveviewService.prototype.prepareLiveviewData = function () {
            var liveviewData = [];
            var module = {};
            var moduleType;
            for (var i = 0; i < this.liveview.modules.length; i++) {
                module = {
                    "type": this.liveview.modules[i].type,
                    "width": this.liveview.modules[i].size.w,
                    "height": this.liveview.modules[i].size.h,
                    "xPosition": this.liveview.modules[i].position.x,
                    "yPosition": this.liveview.modules[i].position.y
                };
                //switch over possible moduleTypes and add necessary values for this type
                moduleType = this.liveview.modules[i].type;
                switch (moduleType) {
                    case 'calendar':
                        module.calendarIds = this.liveview.modules[i].typeData.calendarIds;
                        break;
                    default:
                }
                liveviewData.push(module);
            }
            return liveviewData;
        };

        /**
         * @name persist
         * @desc Sends the current Liveview state to the Server
         * @param typeData {}   necessary Data for a module type
         */
        LiveviewService.prototype.persist = function () {
            var liveviewData = this.prepareLiveviewData();
            console.log("liveviewdata: ", liveviewData );
            var defer = $q.defer();
            $http({
                url: 'http://api.perna.dev/v1/modules',
                methd: 'PUT',
                data: liveviewData
            })
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
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