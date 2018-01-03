var gameTime = 10;
var gameStart;
var overGame;
var ii;
window.onload = timeinit();

function timeinit() {
    var startBtn = document.getElementById('startBtn');
    var remainingTime = document.getElementById('remainingTime');
    var sydsj = document.getElementById('sydsj');
    startBtn.onclick = function () {
        gameStart = new Date();
        djs();
    }
}

function djs() {
    // console.log("您已经点击了开始按钮！！");
    var playing = new Date();
    overGame = gameTime - parseInt((playing - gameStart) / 1000);
    ii = setTimeout("djs()", 1000);
    sydsj.innerHTML = overGame;
    if (overGame < 1) {
        console.log("时间到了请下机");
        gameOvers();
    }
}