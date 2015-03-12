game.GameManager = Object.extend({
    init: function (x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function () {
        this.now = new Date().getTime();

        if (game.data.player.dead) {
            me.state.current().resetPlayer(10, 0);
            me.game.world.removeChild(game.data.player);
        }

        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
           game.data.gold += 1;
           console.log("Current gold:" + game.data.gold);
        }

        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1600, 0, {});
            me.game.world.addChild(creepe, 5);
        }

        return true;
    }
});


