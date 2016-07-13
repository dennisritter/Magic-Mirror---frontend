angular.module('perna').service('CalendarService', ['$http', '$q', 'api',
    function ($http, $q, api) {

        var CalendarService = function(){
            /**
             * @name calendars
             * @desc A list of the users calendars.
             * @type array
             */
            this.calendars = [];
        };


        /**
         * @name: getAvailableCalendars
         * @desc: Calls requestCalendars.
         * @note: Frontend Service-Api function call from Controllers.
         */
        CalendarService.prototype.getAvailableCalendars = function () {
            var defer = $q.defer();
            if (this.calendars.length > 0) {
                defer.resolve(this.calendars);
                return defer.promise;
            }

            this.requestCalendars().then(defer.resolve, defer.reject);
            return defer.promise;
        };

        /**
         * @name getCalendars
         * @desc Requests the users calendars from Server.
         * @returns {Promise}
         */
        CalendarService.prototype.requestCalendars = function() {
            var _calendarService = this;
            var defer = $q.defer();
            $http({
                url: api.calendars,
                method: "GET"
            })
                .success(function(response){
                    _calendarService.calendars = response.data;
                    defer.resolve(response.data);
                })
                .error(function(response){
                    defer.reject(response);
                });
            return defer.promise;
        };

        /**
         * @name getEvents
         * @desc Requests the Events of the given calendars from the Server
         * @param calendarIds     an array of calendarIds
         */
        CalendarService.prototype.getEvents = function (calendarIds) {
            var defer = $q.defer();

            if (calendarIds.length < 1) {
                defer.resolve([]);
                return defer.promise;
            }

            $http({
                url: api.events,
                method: "GET",
                params: {calendarIds: calendarIds.join(",")}
            })
                .success(function(response){
                    defer.resolve(response.data);
                })
                .error(function(response){
                    defer.reject(response);
                });
            return defer.promise;
        };

        return new CalendarService();
    }]);
