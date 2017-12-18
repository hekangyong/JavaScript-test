window.onload = initGame();

function initGame() {
    var clouds = null;
    var cloudsAll = [];
    var bird = null;
    var birdAll = [];

    var min = document.getElementById('mid');
    var did = document.getElementById('did');
    window.document.onkeydown = function (ent) {
        var event = ent || window.event;
        switch (event.keyCode) {
            case 37: //左
                mid.style.left = Math.max(0, mid.offsetLeft - 10) + "px";
                break;
            case 38: //上
                mid.style.top = Math.max(0, mid.offsetTop - 10) + "px";
                break;
            case 39: //右
                mid.style.left = Math.min(974, mid.offsetLeft + 10) + "px";
                break;
            case 40: //下
                mid.style.top = Math.min(718, mid.offsetTop + 10) + "px";
                break;

        }
    }

    function moverAndHit() {
        if (cloudsAll != null) {
            for (var j = 0; j < cloudsAll.length; j++) {
                var enemySpeed = parseInt(cloudsAll[j].style.top.substring(0, 3));
                enemySpeed += ens;
                cloudsAll[j].style.top = enemySpeed + 'px';
                if (hitTestObject(myFly, cloudsAll[j]) == true) {
                    gameOver();
                }
                if (enemySpeed > 600) {
                    bodyBg.removeChild(cloudsAll[j]);
                    cloudsAll.splice(j, 1)
                }
            }
        }
    }
    function setEnemy() {
        clouds = document.createElement('div');
        clouds.setAttribute('id', 'enemy');
        did.appendChild(clouds);
        var i = Math.floor(Math.random() * 24) * clouds.offsetWidth;
        clouds.style.left = i + 'px';
        clouds.style.top = 0;
        cloudsAll.push(clouds);
    }

}