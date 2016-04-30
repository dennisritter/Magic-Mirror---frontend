angular.module('perna').service('StorageService', ['$http', '$q', function ($http, $q) {
    //Saves userdata on Mongodb
    var registerUser = function (data) {
        var defer = $q.defer();
        $http({
            url: "http://api.perna.dev/v1/register",
            method: "POST",
            data: data
        })
            .success(function (response) {
                defer.resolve(data);
            })
            .error(function (response) {
                defer.reject(response);
            });
        return defer.promise;
    };

    return {
        registerUser: registerUser
    };
}]);