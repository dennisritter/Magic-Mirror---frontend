angular.module('perna').service('AuthService', ['$http', '$q', function ($http, $q) {

    var AuthService =  function(){
        this.credentials = {
            accessToken: {
                token: undefined,
                expirationDate: undefined
            },
            refreshToken: {
                token: undefined,
                expirationDate: undefined
            },
        }
    }

    AuthService.prototype.login = function (data) {
        var defer = $q.defer();
        $http({
            url: "http://api.perna.dev/v1/login",
            method: "POST",
            data: data
        })
            .success(function (response) {
                defer.resolve(response);
            })
            .error(function (response) {
                defer.reject(response);
            });
        return defer.promise;
    };

    AuthService.prototype.logout = function (accessToken) {
        var defer = $q.defer();
        $http({
            url: "http://api.perna.dev/v1/logout",
            method: "POST",
            headers: {
                'Access-Token' : accessToken
            }
        })
            .success(function (response) {
                defer.resolve(response);
            })
            .error(function (response) {
                defer.reject(response);
            });
        return defer.promise;
    };

    return new AuthService();

}]);