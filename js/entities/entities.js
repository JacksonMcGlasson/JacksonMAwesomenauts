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
        //sets velocity
        this.body.setVelocity(5, 20);
        this.facing = "right";
        //makes screen follow player
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        //adds animations for name, frames and speed
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        //sets current animation for game start
        this.renderable.setCurrentAnimation("idle");
    },
    update: function (delta) {
        //control for moving right
        if (me.input.isKeyPressed("right")) {
            this.flipX(true);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";

        }
        //control for moving left
        else if (me.input.isKeyPressed("left")) {
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
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

        if (me.input.isKeyPressed('attack')) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets animation to attack than to idle
                this.renderable.setCurrentAnimation("attack", "idle");
                //begin from first animation
                this.renderable.setAnimationFrame();
            }


        } else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }
        // me.collision.check(this, true, this.collideHandler.bind(this));
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    // collideHandler: function (response) {
    //    if (response.b.type==='EnemyBaseEntity') {
    //        var ydif = this.pos.y - response.b.pos.y;
    //        var xdif = this.pos.x - response.b.pos.x;

    //        if (xdif > - 35 && this.facing === "right"){
    //            this.body.vel.x = 0;
    //            this.pos.x = this.pos.x - 1;
    //        }else if(xdif<60 && this.facing === "left"){
    //             this.body.vel.x = 0;
    //             this.pos.x = this.pos.x + 1;
    //        }
    //    }
    //  }
});

game.PlayerBaseEntity = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function () {
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "PlayerBaseEntity";

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function (delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function () {

    }

});

game.EnemyBaseEntity = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function () {
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "EnemyBaseEntity";
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function (delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function () {

    }

});