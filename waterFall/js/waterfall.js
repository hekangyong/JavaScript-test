window.onload = function () {
  var waterfall = document.getElementById('waterfall');
  var aList = waterfall.getElementsByTagName('li');

  ajax({
    url: 'data/imagesData.json',
    success: function (response, xml) {
      renderDOM(response);
    }
  });

  // 窗口事件
  window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var waterfall_h = waterfall.offsetHeight;
    var window_h = window.innerHeight;

    if (waterfall_h - window_h < scrollTop) {
      ajax({
        url: 'data/1.json',
        success: function (response, xml) {
          renderDOM(response);
        }
      });
    }
  };

  window.onresize = function () {
    setPosition();
  };

  function renderDOM(response) {
    var data = JSON.parse(response);

    for (var i = 0; i < data.length; i++) {
      var create_li = document.createElement('li');
      var create_a = document.createElement('a');
      var create_title = document.createElement('p');

      create_a.innerHTML = '<img src='+data[i].picture+' alt="#">';
      create_a.className = 'bounceIn animated';
      create_a.href = data[i].target;
      create_a.style.height = data[i].height + 'px';
      create_title.innerHTML = data[i].title;      

      create_li.appendChild(create_a);
      create_li.appendChild(create_title);

      waterfall.appendChild(create_li);
    }

    setPosition();
  };
/*
  // 图片预加载
  function renderDOM(response) {
    var data = JSON.parse(response);

    for (var i = 0; i < data.length; i++) {

      prepareImage(data[i].picture, function () {
        var create_li = document.createElement('li');
        var create_img = document.createElement('img');

        create_img.src = this.src;
        create_img.style.height = this.height + 'px';

        create_li.appendChild(create_img);
        waterfall.appendChild(create_li);

        setPosition();
      });
    }
  };*/

  function setPosition() {
    var cols = getCols();
    var heightArr = [];
    var i = 0;
    var waterfall_h = 0;
    var item_width = aList[0].offsetWidth + 10;

    for (i = 0; i < aList.length; i++) {
      if (i < cols) {
        heightArr.push(aList[i].offsetHeight);

        aList[i].style.top = 0;
        aList[i].style.left = i * item_width + 'px';
      } else {
        var _index = getShort(heightArr);
        var min = Math.min.apply(null, heightArr);

        aList[i].style.left = aList[_index].offsetLeft + 'px';
        aList[i].style.top = min + 20 + 'px';

        heightArr[_index] += aList[i].offsetHeight + 20;
      }

      aList[i].style.position = 'absolute';
      aList[i].style.margin = 0;
    }

    waterfall_h = aList[aList.length - 1].offsetTop + aList[aList.length - 1].offsetHeight;

    waterfall.style.width = cols * item_width + 'px';
    waterfall.style.height = waterfall_h + 'px';
  };

  function getShort(heightArr) {
    var index = 0;
    var min = heightArr[0];

    for (var i = 0; i < heightArr.length; i++) {
      if (min > heightArr[i]) {
        min = heightArr[i];
        index = i;
      }
    }

    return index;
  };

  function getCols() {
    var body_w = document.documentElement.clientWidth;
    var item_w = aList[0].offsetWidth;
    var result = Math.floor(body_w / item_w);

    return result >= 5 ? 5 : result;
  };

  function prepareImage(imageUrl, callBack) {
    var oImg = new Image();

    oImg.src = imageUrl;

    oImg.onload = function () {
      callBack.call(oImg);
    };
  };
};