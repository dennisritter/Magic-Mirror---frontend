angular.module('perna').service('StorageService', ['$http', '$q', 'api',
    function ($http, $q, api) {
    //Saves userdata on Mongodb
    var register = function (data) {
        var defer = $q.defer();
        $http({
            url: api.save,
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
        register: register
    };
}]);
