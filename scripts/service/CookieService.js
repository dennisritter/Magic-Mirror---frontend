angular.module('perna').service('CookieService', ['$cookies', 
    function ($cookies) {

    var setCookies = function (response) {
        $cookies.put('MagicMirror', response.data.token, {
            expires: response.data.expirationDate
        });
        $cookies.putObject('MagicMirrorRefresh',
            {
                accessToken: response.data.token,
                refreshToken: response.data.refreshToken.token
            },
            {
                expires: response.data.refreshToken.expirationDate
            });
    };

    var getCookies = function () {
        var cookieData = {
            accessToken: $cookies.get('MagicMirror'),
            refreshToken: $cookies.getObject('MagicMirrorRefresh')
        };
        return cookieData;
    };

    var deleteCookies = function () {
        $cookies.remove('MagicMirror');
        $cookies.remove('MagicMirrorRefresh');
    };

    return {
        setCookies: setCookies,
        getCookies: getCookies,
        deleteCookies: deleteCookies
    };
}]);
