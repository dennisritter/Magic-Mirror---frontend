angular.module('perna').controller('liveviewCtrl', [ '$scope', 'GridService',
    function ( $scope, GridService ) {

        GridService.buildGrid();
        $scope.add = function(){
            GridService.add(GridService.newItem(1,1,0,1));
            GridService.refreshGrid();
        };

        $('#grid li .resize').click(function(e) {
            e.preventDefault();
            var itemElement = $(e.currentTarget).closest('li'),
                itemWidth = $(e.currentTarget).data('w'),
                itemHeight = $(e.currentTarget).data('h');

            $('#grid').gridList('resizeItem', itemElement, {
                w: itemWidth,
                h: itemHeight
            });
        });

        
    }]);