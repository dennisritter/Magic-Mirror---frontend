angular.module('perna').service('AuthService', ['$http', '$q', 'CookieService',
    function ($http, $q, CookieService) {

    var AuthService = function() {
        this.credentials = {
            accessToken: {
                token: undefined,
                expirationDate: undefined
            },
            refreshToken: {
                token: undefined,
                expirationDate: undefined
            },
        };
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
                _authService.credentials.accessToken.token = response.data.token;
                _authService.credentials.accessToken.expirationDate = response.data.expirationDate;
                _authService.credentials.refreshToken.token = response.data.refreshToken.token;
                _authService.credentials.refreshToken.expirationDate = response.data.refreshToken.expirationDate;
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
                'Access-Token' : _authService.credentials.accessToken.token
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