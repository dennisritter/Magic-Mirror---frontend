/**
 * @author Dennis Ritter
 * @name AuthService
 * @desc A Service which includes functions for user autentification
 * @return An Instance of AuthService
 */
angular.module('perna').service('AuthService', ['$http', '$q', 'CookieService', 'api',
    function ($http, $q, CookieService, api) {

        var AuthService = function () {
            this.credentials = {
                accessToken: undefined,
                refreshToken: {
                    accessToken: undefined,
                    refreshToken: undefined
                }

            };
            this.isAuthenticated = false;
        };

        AuthService.prototype.clearCredentials = function(){
            this.credentials.accessToken = undefined;
            this.credentials.refreshToken.accessToken = undefined;
            this.credentials.refreshToken.refreshToken = undefined;
        };

        AuthService.prototype.autoLogin = function (data) {
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
                    _authService.isAuthenticated = true;
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
                url: api.login,
                method: "POST",
                data: data
            })
                .success(function (response) {
                    _authService.credentials.accessToken = response.data.token;
                    _authService.credentials.refreshToken = response.data.refreshToken.token;
                    CookieService.setCookies(response);
                    _authService.isAuthenticated = true;
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
                url: api.logout,
                method: "POST",
                headers: {
                    'Access-Token': _authService.credentials.accessToken
                }
            })
                .success(function (response) {
                    CookieService.deleteCookies();
                    _authService.clearCredentials();
                    _authService.isAuthenticated = false;
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        return new AuthService();

    }]);
