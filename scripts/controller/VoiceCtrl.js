angular.module('perna').controller('VoiceCtrl', ['$scope',
    function ($scope) {

        $scope.showText = function (text) {
            $scope.said = text;
        };

        $scope.mostBeautiful = function (derDie) {
            if (derDie == 'der' || derDie == 'die') {
                $scope.said = 'userName ist ' + derDie + ' Schönste im ganzen Land.';
            } else {
                $scope.said = 'Deine Mudder.';
            }
        };

        var commands = {
            "Spieglein Spieglein an der Wand wer ist :derDie Schönste im ganzen Land": $scope.mostBeautiful,

            '*text': $scope.showText
        };
        annyang.debug();
        annyang.setLanguage('de-DE');
        annyang.addCommands(commands);
        annyang.start(false, false);

    }]);
