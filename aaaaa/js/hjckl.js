window.onload = init();

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
    did = document.getElementById('did');

function initGame() {
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
        timer = null;
    var ens = 1;
    blueTimer = setInterval(blueHit, 15);

    function blueHit() {
        if (blueAll != null) {
            for (var i = 0; i < blueAll.length; i++) {
                var blueSpeed = parseInt(blueAll[i].style.right.substring(0, 3));
                blueSpeed += ens;
                blueAll[i].style.right = blueSpeed + "px";
                if (hitTestObject(mid, blueAll[i]) == true) {
                    gameOver();
                }
                if (blueSpeed > 1024) {
                    did.removeChild(blueAll[i]);
                    blueAll.splice(i, 1);
                }
            }
        }
    }
    timer = setInterval(setBlue, 5000);

    function setBlue() {
        blue = document.createElement('img');
        blue.setAttribute('src', 'images/snow.png');
        blue.setAttribute('id', 'big');
        did.appendChild(blue);
        var i = Math.floor(Math.random() * 15) * blue.offsetHeight;
        blue.style.right = 0;
        blue.style.top = i + 'px';
        blueAll.push(blue);
    }
    // setBlue();

    function gameOver() {
        clearInterval(blueTimer);
        clearInterval(timer);
        for (var j = blueAll.length - 1; j >= 0; j--) {
            did.removeChild(blueAll[j]);
            blueAll.splice(j, 1);
        }
        var gameOver = document.getElementById('gameOver'),
            submit = document.getElementById('submit'),
            restart = document.getElementById('restart');
        gameOver.style.cssText = 'display:block';
        did.style.cssText = 'display:none';
        restart.onclick = function () {
            initGame();
            gameOver.style.cssText = 'display:none';
            did.style.cssText = 'display:block';
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