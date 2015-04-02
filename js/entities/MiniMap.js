game.MiniMap = Entity.extend({
    init: function (x, y, settings, facing) {
        this._super(me.Entity, 'init', [x, y, {
                image: "minimap",
                width: 400,
                height: 127,
                spritewidth: "400",
                spriteheight: "127",
                getShape: function () {
                    return(new me.Rect(0, 0, 400, 127)).toPolygon();
                }
            }]);
        this.floating = true;
    }
});