angular.module('perna').service('CookieService', ['$cookies', function ($cookies) {

    var setCookies = function (response){
        $cookies.put('MagicMirror', response.data.token,{
            expires : response.data.expirationDate
        });
        $cookies.put('MagicMirrorRefresh', response.data.refreshToken.token,{
            expires : response.data.refreshToken.expirationDate
        });
    };

    var getCookies = function(){
        var cookieData = {
            access : $cookies.getObject('MagicMirror'),
            refresh : $cookies.getObject('MagicMirrorRefresh')
        };
        return cookieData;
    };

    return{
        set : setCookie,
        get : getCookie
    };
}]);
