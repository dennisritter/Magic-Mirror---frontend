angular.module('perna').service('CookieService', ['$cookies', function ($cookies) {

    var setCookie = function (response){
        $cookies.put('MagicMirror', response.data.token,{
            expires : response.data.expirationDate
        });
        $cookies.put('MagicMirrorRefresh', response.data.refreshToken.token,{
            expires : response.data.refreshToken.expirationDate
        });
    };

    var getCookie = function(){
        return $cookies.getObject('MagicMirror');
    };

    return{
        set : setCookie,
        get : getCookie
    };
}]);
