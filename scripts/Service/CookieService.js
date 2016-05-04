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
            accessToken : $cookies.getAll()['MagicMirror'],
            refreshToken : $cookies.getAll()['MagicMirrorRefresh']
        };
        return cookieData;
    };

    var deleteCookies = function() {
        $cookies.remove('MagicMirror');
        $cookies.remove('MagicMirrorRefresh');
    };

    return{
        setCookies : setCookies,
        getCookies : getCookies,
        deleteCookies : deleteCookies
    };
}]);
