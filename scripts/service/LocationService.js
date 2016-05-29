/**
 * @author Johannes Ebeling
 * @name LocationService
 * @desc A Service which includes functions for getting the users location
 * @return An Instance of LocationService
 */

 angular.module('perna').service('LocationService', ['$http', '$q',
     function ($http, $q) {

        var LocationService = function () {
            var userCoords = {
                lat : undefined,
                long : undefined
            },

            var userLocationID = undefined;
         };

        LocationService.prototype.getLocationIDWithUserInput(input){
            var _authService = this;
            var defer = $q.defer();
            $http({
                url: api.refresh,
                method: "POST",
                data: data
            })
                .success(function (response) {
                    _authService.credentials.accessToken = response.data.token;
                    _authService.credentials.refreshToken = response.data.refreshToken.token;
                    CookieService.setCookies(response);
                    $http.defaults.headers.common = {'Access-Token' : _authService.credentials.accessToken};
                    _authService.isAuthenticated = true;
                    defer.resolve();
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        LocationService.prototype.getLocationIDWithAutocomplete(){

        }

         return new LocationService();
     }]);
