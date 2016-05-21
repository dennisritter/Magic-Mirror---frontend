angular.module('perna').service('MouseService', ['$timeout', function ($timeout) {

    this.mouseData = {
        isMoving: false
    };

    var mouseIsMoving = function () {
        this.mouseData.isMoving = true;
        stopTimer();
        startTimer();
    };
    var stopTimer = function(){
        $timeout.cancel(isMovingTimer);
    };

    var _service = this;
    var isMovingTimer;
    var startTimer = function () {
        isMovingTimer = $timeout(function () {
            _service.mouseData.isMoving = false;
        }, 5000);
    };

    return {
        mouseData: this.mouseData,
        mouseIsMoving: mouseIsMoving
    };
}]);

