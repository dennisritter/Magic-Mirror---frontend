angular.module('perna').service('CalendarService', ['$http', '$q', 'AuthService',
    function ($http, $q, AuthService) {

        /**
         * A list of the users calendars.
         */
        var CalendarService = function(){
            this.calendars = [];
        };

        /**
         * Requests the users calendars from Server.
         * @param accessToken
         * @returns {Promise}
         */
        CalendarService.prototype.getCalendars = function() {
            var _calendarService = this;
            var defer = $q.defer();
            $http({
                url: "http://api.perna.dev/v1/calendar/calendars",
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
         * Requests the Events of the given calendars from the Server
         * @param calendars     an array of calendarIds
         */
        CalendarService.prototype.getEvents = function(calendarIds){
            var defer = $q.defer();
            console.log(calendarIds.join(","));
            $http({
                url: "http://api.perna.dev/v1/calendar/events",
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