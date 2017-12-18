var validateCode = document.getElementsByClassName('validateCode')[0];
var code = document.getElementsByClassName('code')[0];
var refresh = document.getElementsByClassName('refresh')[0];
var wrongShow = document.getElementsByClassName('wrong-show')[0];
var btn = document.getElementsByClassName('btn')[0];

var result = [];
var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

function getRandStar() {
    result.length = 0;
    for (var i = 0; i < 4; i++) {
        var num = Math.floor(Math.random() * 62);
        result[i] = arr[num];
    }
    var codeStar = result.join('');
    code.innerText = codeStar;
}

window.onload = getRandStar();

refresh.onclick = function () {
    getRandStar();
}

btn.onclick = function () {
    var val = validateCode.value;
    var current = result.join('');
    console.log(val, typeof val, current, typeof current)
    if (current == val) {
        getRandStar();
        alert('验证码输入正确!');
    } else {
        wrongShow.innerText = '验证码输入有误!';
        getRandStar();
    }
}