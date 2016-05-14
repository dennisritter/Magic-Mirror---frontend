angular.module('perna').controller('liveviewCtrl', [ '$scope', 'GridService',
    function ( $scope, GridService ) {

        GridService.buildGrid();
        $scope.add = function(){
            GridService.add(GridService.newItem(1,1,0,1));
            GridService.refreshGrid();
        };

        
    }]);