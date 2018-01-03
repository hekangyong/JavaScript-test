

/* 初始化界面 */
function init() {
    var startBtn = document.getElementById('startBtn'),
        bodyBg = document.getElementById('bodyBg'),
        startView = document.getElementById('startView');
    if (startBtn.addEventListener) {
        startBtn.addEventListener('click', startHandler, false);
    } else if (startBtn.attachEvent) {
        startBtn.attachEvent('onclick', startHandler);
    } else {
        startBtn.onclick = startHandler;
    }

    function startHandler() {   
        startView.style.cssText = 'display:none';
        bodyBg.style.cssText = 'display:block';
        if (startBtn.addEventListener) {
            startBtn.removeEventListener('click', startHandler, false);
        } else if (startBtn.attachEvent) {
            startBtn.detachEvent('onclick', startHandler);
        } else {
            startBtn.onclick = null;
        }
        initGame();
    }
}
window.onload = init;
var myFly = document.getElementById('myFly'),
    bodyBg = document.getElementById('bodyBg'),
    score = document.getElementById('score');

function initGame() {
    var flyLeft = 20,
        shell = null,
        timer = null,
        shellArr = [],
        setStartPos = 0,
        setTime = null,
        enemy = null,
        enemyArr = [],
        scoreInt = 0;

    /* 可控制黑色方块的移动 */
    document.onmousemove = function (event) {
        var e = event || window.event;
        if (e.clientY < 500 && e.clientY > 80 && e.clientX > 20 && e.clientX < 500) {
            myFly.style.left = e.clientX - flyLeft + 'px';
            myFly.style.top = e.clientY - flyLeft + 'px';
        }
    };

    /* 发射子弹的一串代码 */
    myFly.onmousedown = function (event) {
        var e = event || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        shell = document.createElement('div');
        shell.setAttribute('id', 'shell');
        bodyBg.appendChild(shell);
        shell.style.left = e.clientX - 5 + 'px';
        shell.style.top = e.clientY - 5 + 'px';
        shellArr.push(shell);
    };

    var speed = 8;
    var ens = 1;
    timer = setInterval(moveAndHit, 30);

    /* 移动目标的和检测碰撞代码 */
    function moveAndHit() {
        if (enemyArr != null) {
            for (var j = 0; j < enemyArr.length; j++) {
                var enemySpeed = parseInt(enemyArr[j].style.top.substring(0, 3));
                enemySpeed += ens;
                enemyArr[j].style.top = enemySpeed + 'px';
                if (hitTestObject(myFly, enemyArr[j]) == true) {
                    gameOver();
                }
                if (enemySpeed > 600) {
                    bodyBg.removeChild(enemyArr[j]);
                    enemyArr.splice(j, 1)
                }
            }
        }
        /* 检测子弹与敌人之间碰撞，计算击落敌人的数量并且尽行计数 */
        if (shell != null) {
            for (var i = 0; i < shellArr.length; i++) {
                setStartPos = parseInt(shellArr[i].style.top.substring(0, 3));
                shellArr[i].style.top = setStartPos - speed + "px";
                for (var k = 0; k < enemyArr.length; k++) {
                    if (hitTestObject(shellArr[i], enemyArr[k]) == true) {
                        // console.log("碰上了")
                        bodyBg.removeChild(shellArr[i]);
                        shellArr.splice(i, 1);
                        bodyBg.removeChild(enemyArr[k]);
                        enemyArr.splice(k, 1);
                        scoreInt++;
                        if (scoreInt % 5 == 0) {
                            if (ens < 15) {
                                ens++;
                            }
                            if (enemyTime >= 400) {
                                enemyTime -= 200;
                                clearInterval(setTime);
                                setTime = setInterval(setEnemy, enemyTime);
                            }
                        }
                        score.innerHTML = 'score:' + scoreInt;
                    }
                }
                if (setStartPos - speed <= 60) {
                    bodyBg.removeChild(shellArr[i]);
                    shellArr.splice(i, 1);
                }
            }
        }
    }
    var enemyTime = 2000;
    setTime = setInterval(setEnemy, 2000);
    /* 随机出现自上而下的敌人 */
    function setEnemy() {
        enemy = document.createElement('div');
        enemy.setAttribute('id', 'enemy');
        bodyBg.appendChild(enemy);
        var i = Math.floor(Math.random() * 12) * enemy.offsetWidth;
        enemy.style.left = i + 'px';
        enemy.style.top = 0;
        enemyArr.push(enemy);
    }
    /* 游戏结束 */
    function gameOver() {
        clearInterval(setTime);
        clearInterval(timer);
        for (var j = enemyArr.length - 1; j >= 0; j--) {
            bodyBg.removeChild(enemyArr[j]);
            enemyArr.splice(j, 1);
        }
        for (var i = shellArr.length - 1; i >= 0; i--) {
            bodyBg.removeChild(shellArr[i]);
            shellArr.splice(i, 1);
        }
        document.onmousemove = null;
        var gameOver = document.getElementById('gameOver');
        var iverScore = document.getElementById('iverScore');
        var restart = document.getElementById('restart');
        iverScore.innerHTML = 'score:' + scoreInt;
        gameOver.style.cssText = 'display:block';
        bodyBg.style.cssText = 'display:none';
        restart.onclick = function () {
            initGame();
            gameOver.style.cssText = 'display:none';
            bodyBg.style.cssText = 'display:block';
            score.innerHTML = 'score: ' + 0;
            restart.onclick = null;
        }
    }
}

/* 碰撞测试 */
function hitTestObject(item, hitObj) {
    if (item == null || hitObj == null) {
        return;
    }
    /* 检测碰撞元素上下左右的位置 */
    var itemTop = item.offsetTop,
        itemFoot = item.offsetTop + item.offsetHeight,
        itemLeft = item.offsetLeft,
        itemRight = item.offsetLeft + item.offsetWidth;
    /*被碰撞元素的上下左右的位置*/
    var hitTop = hitObj.offsetTop,
        hitFoot = hitObj.offsetTop + hitObj.offsetHeight,
        hitLeft = hitObj.offsetLeft,
        hitRight = hitObj.offsetLeft + hitObj.offsetWidth;
    if (itemFoot > hitTop && itemRight > hitLeft && itemTop < hitFoot && itemLeft < hitRight) {
        //hitObj.style.cssText = "background:#000";
        return true;
    }
}