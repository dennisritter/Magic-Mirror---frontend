var app = angular.module('perna');

app.controller('ModuleSettingsCtrl', ['$scope', 'close', 'LiveviewService',
    function($scope, close, LiveviewService) {

    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.delete = function(  ){
        var successCallback = function(){
            console.log("Deleted module: ", $scope.module);
        };
        var errorCallback = function(response){
            console.error("deleteModuleError: ", response);
        };
        LiveviewService.deleteModule($scope.module).then(successCallback, errorCallback);
    };

}]);