angular.module('perna').controller('liveviewCtrl', [ 'GridService',
    function ( GridService ) {

        GridService.initGrid();

    }]);