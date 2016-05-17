angular.module('perna').service('GridService', [ function () {

    /**
     * This array contents all elements of the liveview.
     * @type {*[]}
     */
    var items = [ {w: 1, h: 1, x: 0, y: 0} ];

    /**
     * Creates each liveview-element, with its resize-buttons,
     * item-number and the item-position and -size.
     * @type {{currentSize: number, buildElements: myGrid.buildElements}}
     */


    var myGrid = {
        currentSize: 3,
        buildElements: function($grid, items){
            var item, i;
            for (i = 0; i < items.length; i++) {
                item = items[i];
                var $item = $(
                    '<li >' +
                    '<div class="inner">' +
                    '<div class="controls" >' +
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

        },
        resize: function(size) {
            if (size) {
                this.currentSize = size;
            }
            $('#grid').gridList('resize', this.currentSize);
        }

    };


    /* Defines where to build the grid within the DOM. */
    var buildGrid = function() {
        myGrid.buildElements($('#grid'), items);

        $('#grid').gridList({
            lanes: myGrid.currentSize
        });
    };

    /* Removes all grid-elements already existing in the DOM and re-builds the grid */
    var refreshGrid = function() {
        $('#grid').children().remove();

        buildGrid();
    }

    /* Adds a new item to the array */
    var add = function (item){
        items.push(item);
        console.log("Current array-size: " + items.length);
    };

    /* Creates a new item */
    var newItem = function (w, h, x, y){

        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;

        return this;
    };

    return {
        buildGrid: buildGrid,
        add: add,
        newItem: newItem,
        refreshGrid: refreshGrid
    };



}]);