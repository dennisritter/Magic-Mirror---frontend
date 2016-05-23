angular.module('perna').controller('liveviewCtrl', [ '$scope', 'GridService',
    function ( $scope, GridService ) {


        //Hier kommt vielleicht irgendwann die liste mit gespeicherten items an?
        // $scope.items = [ {w: 1, h: 1, x: 0, y: 0},
        //     {w: 1, h: 2, x: 0, y: 1}];
        //
        // $scope.test= "hallo";

        //Lade das Grid sofort
        GridService.buildGrid();
        
        $scope.add = function(){
            
            //erstelle ein neues Item mit default-Werten und refreshe das Grid
            GridService.add(GridService.newItem(1,1,0,0));
            GridService.refreshGrid();
        };

        /*
        * jQuery Methode, aus der Bibliothek kopiert, sie stellt die Resize-Funktion
        * für jedes Item zur Verfügung.
        * */
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