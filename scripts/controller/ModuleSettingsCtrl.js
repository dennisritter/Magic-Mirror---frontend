var app = angular.module('perna');

app.controller('ModuleSettingsCtrl', ['$scope', '$rootScope', 'close', 'LiveviewService',
    function($scope, $rootScope, close, LiveviewService) {

    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.delete = function(){
        var successCallback = function(){
        };
        var errorCallback = function(response){
            console.error("deleteModuleError: ", response);
        };
        LiveviewService.deleteModule($rootScope.module).then(successCallback, errorCallback);
    };

}]);