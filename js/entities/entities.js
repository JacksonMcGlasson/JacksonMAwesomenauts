game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function () {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.body.setVelocity(5, 20);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

        this.renderable.setCurrentAnimation("idle");
    },
    update: function (delta) {
        //control for moving right
        if (me.input.isKeyPressed("right")) {
            this.flipX(true);
            this.body.vel.x += this.body.accel.x * me.timer.tick;

        }
        //control for moving left
        else if (me.input.isKeyPressed("left")) {
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
        //for when mario stands still
        else {
            this.body.vel.x = 0;
        }
        //control for jumping
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }

        }
        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    }
});