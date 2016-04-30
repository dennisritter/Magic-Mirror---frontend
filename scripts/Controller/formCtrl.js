angular.module('perna').controller('formCtrl', ['$scope', 'StorageService',
    function ($scope, StorageService) {

        $scope.btnDisabled = false;

        $scope.save = function () {
            var form = $scope.registrationForm;
            if (!form.$valid) {
                console.log("The form is not valid");
                return;
            }
            var userdata = {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password
            };
            $scope.btnDisabled = true;
            var successCallback = function (data) {
                console.log(data);
                $scope.btnDisabled = false;
            };
            var errorCallback = function (data) {
                console.log(data);
                $scope.btnDisabled = false;
            };

            StorageService.registerUser(userdata).then(successCallback, errorCallback);
        };
    }]);
