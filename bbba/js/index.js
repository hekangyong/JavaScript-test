function creatParagraph() {
    var para = document.createElement('p');
    para.textContent = 'You clicked the button';
    document.body.appendChild(para);
}

var buttons = document.querySelector('button');

for (var i = 0; i < buttons.length; i++) {
    button[i].addEventListener('click',creatParagraph);
}

var para = document.querySelector('p');

para.addEventListener('click', updateName);

function updateName() {
    var name = prompt('Enter a new name');      //请求输一个新的名字，然后把名字储存到一个叫 name 的变量中
    para.textContent = 'Player 1:' + name;      //我们取出字符串 "Player 1: "，然后把它和 name 变量连结起来，创造出完整的文本标签
}