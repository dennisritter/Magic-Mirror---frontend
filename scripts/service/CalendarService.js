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
         * @name getCalendars
         * @desc Requests the users calendars from Server.
         * @param accessToken
         * @returns {Promise}
         */
        CalendarService.prototype.getCalendars = function() {
            var _calendarService = this;
            var defer = $q.defer();
            $http({
                url: api.calendars,
                method: "GET",
            })
                .success(function(response){
                    _calendarService.calendars = response.data;
                    defer.resolve(response);
                })
                .error(function(response){
                    defer.reject(response);
                });
            return defer.promise;
        };

        /**
         * @name getEvents
         * @desc Requests the Events of the given calendars from the Server
         * @param calendars     an array of calendarIds
         */
        CalendarService.prototype.getEvents = function(calendarIds){
            var defer = $q.defer();
            console.log(calendarIds.join(","));
            $http({
                url: api.events,
                method: "GET",
                params: {calendarIds: calendarIds.join(",")}
            })
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(response){
                    defer.reject(response);
                });
            return defer.promise;
        };

        return new CalendarService();

    }]);
