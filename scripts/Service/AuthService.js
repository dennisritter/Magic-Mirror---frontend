/**
 * @author Dennis Ritter
 * @name AuthService
 * @desc A Service which includes functions for user autentification
 * @return An Instance of AuthService
 */
angular.module('perna').service('AuthService', ['$http', '$q', 'CookieService',
    function ($http, $q, CookieService) {

        var AuthService = function () {
            this.credentials = {
                accessToken: undefined,
                refreshToken: {
                    accessToken: undefined,
                    refreshToken: undefined
                }

            };
        };

        AuthService.prototype.autoLogin = function (data) {
            var _authService = this;
            var defer = $q.defer();
            $http({
                url: "http://api.perna.dev/v1/refresh",
                method: "POST",
                data: data
            })
                .success(function (response) {
                    _authService.credentials.accessToken = response.data.token;
                    _authService.credentials.refreshToken = response.data.refreshToken.token;
                    CookieService.setCookies(response);
                    defer.resolve();
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        AuthService.prototype.login = function (data) {
            var _authService = this;
            var defer = $q.defer();
            $http({
                url: "http://api.perna.dev/v1/login",
                method: "POST",
                data: data
            })
                .success(function (response) {
                    _authService.credentials.accessToken = response.data.token;
                    _authService.credentials.refreshToken = response.data.refreshToken.token;
                    CookieService.setCookies(response);
                    defer.resolve();
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        AuthService.prototype.logout = function () {
            var _authService = this;
            var defer = $q.defer();
            $http({
                url: "http://api.perna.dev/v1/logout",
                method: "POST",
                headers: {
                    'Access-Token': _authService.credentials.accessToken
                }
            })
                .success(function (response) {
                    CookieService.deleteCookies();
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        return new AuthService();

    }]);