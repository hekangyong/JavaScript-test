window.onload = init();
var gameOver, gameOvers;

function init() {
    var strat = document.getElementById('strat'),
        startBtn = document.getElementById('startBtn'),
        did = document.getElementById('did');
    if (startBtn.addEventListener) {
        startBtn.addEventListener('click', startHandler, false);
    } else if (startBtn.attachEvent) {
        startBtn.attachEvent('onclick', startHandler);
    } else {
        startBtn.onclick = startHandler;
    }

    function startHandler() {
        strat.style.cssText = 'display:none';
        did.style.cssText = 'display:block';
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

var strat = document.getElementById('strat'),
    startBtn = document.getElementById('startBtn'),
    mid = document.getElementById('mid'),
    score = document.getElementById('scrose'),
    did = document.getElementById('did');

function initGame() {

    // var game = setTimeout(gameOver(),10000);

    var left = null,
        right = null,
        top = null,
        bottom = null;
    setInterval(function () {
        if (left) {
            mid.style.left = Math.max(0, mid.offsetLeft - 7) + "px";
        }
        if (top) {
            mid.style.top = Math.max(0, mid.offsetTop - 7) + "px";
        }
        if (right) {
            mid.style.left = Math.min(974, mid.offsetLeft + 7) + "px";
        }
        if (bottom) {
            mid.style.top = Math.min(718, mid.offsetTop + 7) + "px";
        }
    }, 10);
    document.onkeydown = function (ev) {
        var ev = ev || event;
        var code = ev.keyCode;
        switch (code) {
            case 37:
                left = true;
                break;
            case 38:
                top = true;
                break;
            case 39:
                right = true;
                break;
            case 40:
                bottom = true;
                break;
        }
    }
    document.onkeyup = function (ev) {
        var ev = ev || event;
        var code = ev.keyCode;
        switch (code) {
            case 37:
                left = false;
                break;
            case 38:
                top = false;
                break;
            case 39:
                right = false;
                break;
            case 40:
                bottom = false;
                break;
        }
    }

    var blue = null,
        blueTimer = null,
        blueAll = [],
        stars = null,
        starsAll = [],
        starsTimer = null,
        scoreInt = null,
        newBgPosTime = null,
        timer = null;

    var ens = 1;
    var speed = 2;
    blueTimer = setInterval(blueHit, 15);

    function blueHit() {
        if (blueAll != null) {
            for (var i = 0; i < blueAll.length; i++) {
                var blueSpeed = parseInt(blueAll[i].style.right.substring(0, 3));
                blueSpeed += ens;
                blueAll[i].style.right = blueSpeed + "px";
                if (hitTestObject(mid, blueAll[i]) == true) {
                    gameOvers();
                }
                if (blueSpeed > 1024) {
                    did.removeChild(blueAll[i]);
                    blueAll.splice(i, 1);
                }
            }
        }
        if (stars != null) {
            for (var j = 0; j < starsAll.length; j++) {
                var enemySpeed = parseInt(starsAll[j].style.top.substring(0, 3));
                enemySpeed += ens;
                starsAll[j].style.top = enemySpeed + "px";
                if (hitTestObject(mid, starsAll[j]) == true) {
                    // console.log('aaaa');
                    did.removeChild(starsAll[j]);
                    starsAll.splice(j, 1);
                    scoreInt++;
                    if (scoreInt % 5 == 0) {
                        if (ens < 15) {
                            ens++;
                        }
                        if (timer >= 400) {
                            timer -= 200;
                            clearInterval(timer);
                            timer = setInterval(Stars, timer);
                        }
                    }
                    score.innerHTML = '收集到的星星数量：' + scoreInt;
                }
            }
        }
    }

    var starsTime = 2000;
    timer = setInterval(setBlue, 5000);

    function setBlue() {
        var b = new Array(3);
        b[0] = "images/3813_P_1456924002814.jpg";
        b[1] = "images/20140527123329_cCGLu.jpg";
        b[2] = "images/01300001128119146475325219223_s.jpg";
        var c = Math.floor(Math.random() * 3);
        blue = document.createElement('img');
        blue.setAttribute('src', b[c]);
        blue.setAttribute('id', 'big');
        did.appendChild(blue);
        var i = Math.floor(Math.random() * 15) * blue.offsetHeight;
        blue.style.right = 0;
        blue.style.top = i + 'px';
        blueAll.push(blue);
    }

    starsTimer = setInterval(Stars, 7000);

    function Stars() {
        stars = document.createElement('img');
        stars.setAttribute('src', 'images/images.jpg');
        stars.setAttribute('id', 'starsT');
        did.appendChild(stars);
        var i = Math.floor(Math.random() * 15) * stars.offsetWidth;
        stars.style.top = 0;
        stars.style.right = i + 'px';
        starsAll.push(stars);
    }


    gameOvers = function () {
        clearInterval(blueTimer);
        clearInterval(timer);
        clearInterval(starsTimer);
        clearTimeout(ii);
        for (var j = blueAll.length - 1; j >= 0; j--) {
            did.removeChild(blueAll[j]);
            blueAll.splice(j, 1);
        }
        for (var i = starsAll.length - 1; i >= 0; i--) {
            did.removeChild(starsAll[i]);
            starsAll.splice(i, 1);
        }
        gameOver = document.getElementById('gameOver'),
            submit = document.getElementById('submit'),
            inerScore = document.getElementById('iverScore'),
            restart = document.getElementById('restart');
        inerScore.innerHTML = '收集到的星星数量：' + scoreInt;
        gameOver.style.cssText = 'display:block';
        did.style.cssText = 'display:none';
        restart.onclick = function () {
            initGame();
            gameOver.style.cssText = 'display:none';
            did.style.cssText = 'display:block';
            score.innerHTML = '收集到的星星数量：' + 0;
            restart.onclick = null;
        }
    }
}

function hitTestObject(item, hitObj) {
    if (item == null || hitObj == null) {
        return;
    }
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
        // alert("碰撞");
        return true;
    }
    //console.log(itemTop,itemFoot,itemLeft,itemRight)
}