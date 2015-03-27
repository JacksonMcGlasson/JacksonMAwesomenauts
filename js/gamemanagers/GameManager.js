


game.ExperienceManager = Object.extend({
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function () {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            alert("YOU WIN!");
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            alert("YOU LOSE!");
        }
        console.log(game.data.exp);

        return true;
    },
    gameOver: function (win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        this.gameover = true;
        me.save.exp = game.data.exp;

        $.ajax({
            type: "POST",
            url: "/../php/controller/save-user.php",
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            dataType: "text"
        })
                .success(function (response) {

                    if (response === "true") {
                        me.state.change(me.state.PLAY);
                    } else {
                        alert(response);
                    }
                })
                .fail(function (response) {
                    alert("Fail");
                });
    }
});

