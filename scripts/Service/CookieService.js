angular.module('perna').service('CookieService', ['$cookies', function ($cookies) {

    var setCookie = function (response){
        var cookieData = {
            acToken : response.data.token,
            refToken : response.data.refreshToken.token
        };
        $cookies.putObject('MagicMirror', cookieData);
    };

    var getCookie = function(){
        return $cookies.getObject('MagicMirror');
    };

    return{
        set : setCookie,
        get : getCookie
    };
}]);
