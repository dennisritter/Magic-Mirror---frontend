angular.module('perna').service('AuthService', ['$http', '$q', function ($http, $q) {
    //Saves userdata on Mongodb
    var login = function (data) {
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

    return {
        login: login
    };
}]);