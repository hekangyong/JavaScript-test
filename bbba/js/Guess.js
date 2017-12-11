/*****************
    下面的代码则是储存接下来将要用到的变量和数据
    1.第一个变量-randomNumber-被分配一个1到100之间的随机数，是用数学我法计算；
    2.第二段中的三个变量则是用于储存对HTML的结果段落的引用，并用于在代码的后面段落中插入值；
    3.第三段中的两个变量则是储存对表单文本输入和提交按钮的引用，并用于控制以后提交猜测；
    4.最后的两个变量储存一个猜测数字1（用于跟踪有多少猜测），以及一个不存在的变量（稍后会用到）
*****************/
var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var guessButton;
guessField.focus;

/*****************
    1.第一行声明了一个变量 userGuess 的变量，并将其值设置为在文本字段中输入的当前值。我们还通过内置的 Number()
        方法运行这个值，只是确保改值绝对是一个数字
    2.再者我们我们的第一个条件代码块，利用 if 语句来进行判断玩家是不是第一次猜数字，如果结果为 true 
        则运行话括号内的代码，如果相反则跳过话括号内的代码。
    3.如果是, 我们让guesses段落的文本内容等于"Previous guesses: "。如果不是，那就说明我们已经执行过了文本设定，那就无需再次设定了。
    4.userGuess值附加到guesses段落的末尾，并加上一个空格，因此在每个猜测值之间将有一个空格。
    5.下一个代码块中（上面的第8-24行）做了几个检查：
        (1).第一个if(){ }检查用户的猜测是否等于在代码顶端设置的randomNumber值。如果是，则玩家猜对了，游戏胜利，我们将向玩家显示一个漂亮的绿色的祝贺信息，并清除猜测信息框的内容，调用setGameOver()方法。
        (2).紧接着我们又写了一个else if(){ } 结构。它会检查这个回合是否是玩家的最后一个回合。如果是，程序将做与前一个程序块相同的事情，除了它显示的是Game Over而不是祝贺消息。
        (3).最后的一个块是else { }，其中包含着前面两个比较都为false才会执行的代码，即玩家还有游戏的次数但是本次没猜对。在这个情况下，我们会告诉玩家他们猜错了，并执行一个条件测试，判断并告诉玩家猜测的数字是大是小。
    6.这个函数最后三行 （上面的第26–28行） 让我们为下次猜测值提交做好准备。我们把guessCount变量的值+1，
        因此玩家消耗了一次机会 （++是一个递增操作符 - 将值+1），然后我们把文本段的值清空，重新将焦点设置在文本段里，准备下一轮游戏
*****************/
function checkGuess() {
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Conratulations ! You got it right';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = ' ';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = 'Game Over !!';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong !';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low !';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high !';
        }
    }

    guessCount++;
    guessField.value = ' ';
    guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess);

/*****************
    1.前面两行的代码为禁用表单文本输入和按钮，方法是将其 disabled 属性设置为 true，这是必要的，如果我们没有禁用，用户在游戏结束后提交更多的猜测，这回破坏游戏规则；
    2.接下来的三行代码则是创建一个 button 按钮，设置他的文本为 “Start new Game”，并添加在文档的底部，
    3.最后一行在我们的新按钮中添加了一个事件监听，当他被点击时，一个名为 resetGame 的函数将被调用
*****************/
function setGameOver() {
    guessField.disabled = 'true';
    guessSubmit.disabled = 'true';
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new Game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

/*****************
    1.将guessCount重置为1。
    2.清除所有信息段落。
    3.从我们的代码中删除重置按钮。
    4.启用表单元素，并清空和聚焦文本字段，准备接受用户输入的新猜测。
    5.从lastResult段中删除背景颜色。
    6.生成一个新的随机数，这样下次您就是在猜测新的数字了！
*****************/
function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = ' ';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = ' ';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}