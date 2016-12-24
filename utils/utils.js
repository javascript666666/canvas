
var utils = {};

/*
  拷贝继承，原对象，新对象，严格模式
*/
utils.extend = function(target, data, strict){
  target = target || {};
  for(var key in data){
    if(data.hasOwnProperty(key)){
      if(typeof data[key] === 'object'){
        target[key] = Array.isArray(data[key]) ? [] : {}:
        arguments.callee(target[key], data[key], true);
      }else{
        target[key] = data[key];
      }
    }
  }
  return target;
};

/*
  返回鼠标在某个元素上的 相对元素左上角的坐标值
*/
utils.offset = function(elem){
  var mouse = {x:0, y:0};
  var rect = elem.getBoundingClientRect();
  elem.addEventListener('mousemove', function(e) {
    if(typeof e.offsetX !== undefined && typeof e.offsetY !== undefined){
      mouse.x = e.offsetX;
      mouse.y = e.offsetY;
    }else{
      mouse.x = e.pageX - rect.left;
      mouse.y = e.pageY - rect.top;
    }
  });
  return mouse;
};

/*
  返回两点间的距离 d2为鼠标坐标数据
*/
utils.distance = function(d1, d2){
  var dx = d2.x - d1.x;
  var dy = d2.y - d1.y;
  return Math.sqrt(dx*dx + dy*dy);
};

/*
  返回两点间和x轴的夹角 d2为鼠标坐标数据
*/
utils.getAngle = function(d1, d2){
  var dx = d2.x - d1.x;
  var dy = d2.y - d1.y;
  return Math.atan2(dy, dx);
};

/*
  角度转换为弧度
*/
utils.toAngle = function(rad){
  return rad * Math.PI / 180;
}

/*
  动画 百分比 从 0 -- 1 需要tween.js
*/
utils.animation = function (start, end, time, fn) {
    var start = {
        x: start
    };
    var tween = new TWEEN.Tween(start).to({
        x: end
    }, time).onUpdate(function() {
        fn && fn(this.x)
    }).easing(TWEEN.Easing.Bounce.Out).start();

    (function(time) {
        requestAnimationFrame(arguments.callee);
        TWEEN.update(time)
    })()
};







































//
