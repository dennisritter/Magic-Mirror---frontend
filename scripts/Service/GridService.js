angular.module('perna').service('GridService', [ function () {

    /**
     * This array contents each box-element which will be seen in the liveview.
     * @type {*[]}
     */
    var items = [{w: 1, h: 1, x: 0, y: 0},
        {w: 1, h: 1, x: 1, y: 0},
        {w: 1, h: 1, x: 0, y: 1}];

    /**
     * Initialize the grid's structure, i.e. add the resize-buttons,
     * the item-number and the item-position and -size.
     * @type {{currentSize: number, buildElements: myGrid.buildElements}}
     */
    var myGrid = {
        currentSize: 3,
        buildElements: function($grid, items){
            var item, i;
            for (i = 0; i < items.length; i++) {
                item = items[i];
                $item = $(
                    '<li>' +
                    '<div class="inner">' +
                    '<div class="controls">' +
                    '<a href="#zoom1" class="resize" data-w="1" data-h="1">1x1</a>' +
                    '<a href="#zoom2" class="resize" data-w="2" data-h="1">2x1</a>' +
                    '<a href="#zoom3" class="resize" data-w="3" data-h="1">3x1</a>' +
                    '<a href="#zoom1" class="resize" data-w="1" data-h="2">1x2</a>' +
                    '<a href="#zoom2" class="resize" data-w="2" data-h="2">2x2</a>' +
                    '</div>' +
                    'this is item n° ' + i +
                    '</div>' +
                    '</li>'
                );
                $item.attr({
                    'data-w': item.w,
                    'data-h': item.h,
                    'data-x': item.x,
                    'data-y': item.y
                });
                $grid.append($item);
            }
        }
    };

    /**
     * Add the Grid into the html document.
     */
    var initGrid = function() {
        myGrid.buildElements($('#grid'), items);

        $('#grid').gridList({
            lanes: myGrid.currentSize
        });
    };

    return {
        initGrid: initGrid
    };

}]);