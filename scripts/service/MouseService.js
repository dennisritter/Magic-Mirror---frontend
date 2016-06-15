angular.module('perna').service('MouseService', ['$timeout', 'ReloadService', function ($timeout, ReloadService) {

    this.mouseData = {
        isMoving: false
    };

    var mouseIsMoving = function () {
        this.mouseData.isMoving = true;
        if(ReloadService.running){
            ReloadService.stop();
        }
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
            ReloadService.start();
            _service.mouseData.isMoving = false;
        }, 5000);
    };

    return {
        mouseData: this.mouseData,
        mouseIsMoving: mouseIsMoving
    };
}]);

