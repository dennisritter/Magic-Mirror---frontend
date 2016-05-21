angular.module('perna').controller('formCtrl', ['$scope', '$state', 'StorageService', 'AuthService',
    function ($scope, $state, StorageService, AuthService) {

        $scope.btnDisabled = false;

        $scope.login = function () {
            var loginData = {
                email: $scope.user.email,
                password: sha256($scope.user.password)
            };
            $scope.btnDisabled = true;
            var successCallback = function () {
                $state.go('dashboard');
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
                //Errormessage under SubmitButton
                $scope.submitError = true;
                $scope.errorMessage = response.message;
                $scope.btnDisabled = false;
            };

            AuthService.login(loginData).then(successCallback, errorCallback);
        };

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
                password: sha256($scope.user.password)
            };
            $scope.btnDisabled = true;
            var successCallback = function (response) {
                $scope.login();
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
                //Errormessage under SubmitButton
                $scope.submitError = true;
                $scope.errorMessage = response.message;
                $scope.btnDisabled = false;
            };

            StorageService.register(userdata).then(successCallback, errorCallback);
        };
    }]);
