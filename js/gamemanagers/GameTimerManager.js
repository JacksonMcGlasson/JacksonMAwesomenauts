game.GameTimerManager = Object.extend({
    init: function (x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function () {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        return true;
    },
    goldTimerCheck: function () {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += game.data.exp1 + 1;
            console.log("Current gold:" + game.data.gold);
        }
    },
    creepTimerCheck: function () {
        //has it been 10 sec since last creep spawn
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            //makes only one a second
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 2500, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});