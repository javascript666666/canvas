/**
 * canvas 工具函数
 * vasion 1.0
 * data 2017-02-09
 */

const fq = {};

/**
 * 用来判断是否为pc端
 * @return {Boolean} 如果是返回true
 */
fq.isPc = function (){
  let ret = true;
  let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let userInfo = window.navigator.userAgent;
  agents.forEach((item, i) => {
    if(userInfo.indexOf(item) !== -1){
      ret = false;
      return;
    }
  });
  return ret;
}

/**
 * 获取鼠标在画布上的坐标
 * @param {object}
 */
fq.mouse = function (ele){
  let mouse = null;
  let rect = ele.getBoundingClientRect();
  if(this.isPc()){
    mouse = {x: 0, y:0};
    ele.addEventListener('mousemove', function (e){
      // e = e || window.event;
      if(typeof e.offsetX !== 'undefined' && typeof e.offsetY !== 'undefined'){
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
      }else{
        mouse.x = e.pageX - rect.left;
        mouse.y = e.pageY - rect.top;
      }
    });
  }else{  // 对移动端的兼容可能会有点问题
    let fn = function (e){
      let touch = e.touches[0];
      mouse.x = touch.pageX - rect.left;
      mouse.y = touch.pageY - rect.top;
    }
    mouse = {x: null, y:null, isTouched: false};
    ele.addEventListener('touchstart', function (e){
      fn(e);
      mouse.isTouched = true;
    });
    ele.addEventListener('touchend', function (e){
      mouse.isTouched = false;
      mouse.x = mouse.y = null;
    });
    ele.addEventListener('touchmove', function (e){
      fn(e);
    });
  }
  return mouse;
};

/**
 * 角度转弧度
 */
fq.toRad = function (angle){
  return angle * Math.PI / 180;
};
/**
 * 弧度转角度
 */
fq.toAngle = function (rad){
  return rad * 180 / Math.PI;
}

fq.extend = function extend(target, data, strict){
  let obj = target || {};
  for(let key in data){
    if(data.hasOwnProperty(key)){
      if(strict && typeof data[key] === 'object'){
        target[key] = Array.isArray(data[key]) ? [] : {};
        this.extend(target[key], data[key], true);
      }else{
        target[key] = data[key];
      }
    }
  }
};

// -------------------------------------
// 对象类

// 小球类
const Ball = function (props){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.rotation = 0;
  this.r = 0;
  this.ss = '#000000';
  this.fs = 'rgba(0, 0, 0, 0)';
  this.alpha = 1;
  fq.extend(this, props);
  return this;
};
Ball.prototype.render = function (ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.strokeStyle = this.ss;
  ctx.fillStyle = this.fs;
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(0, 0, this.r, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  return this;
};

// 箭头
const Arrow = function(props){
  this.x = 100;
  this.y = 100;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.w = 100;
  this.h = 40;
  this.scaleX = 1;
  this.scaleY = 1;
  this.rotation = 0;
  this.fillStyle = 'rgba(221, 96, 50, 0.6)';
  this.strokeStyle = 'rgb(205, 185, 100)';
  fq.extend(this, props, true);
  return this;
}
Arrow.prototype.createPath = function(ctx){
  ctx.beginPath();
  ctx.moveTo(0 - this.w/2, 0 - this.h/2);
  ctx.lineTo(0 + this.w/6, 0 - this.h/2);
  ctx.lineTo(0 + this.w/6, 0 - this.h);
  ctx.lineTo(0 + this.w/2, 0);
  ctx.lineTo(0 + this.w/6, 0 + this.h);
  ctx.lineTo(0 + this.w/6, 0 + this.h/2);
  ctx.lineTo(0 - this.w/2, 0 + this.h/2);
  ctx.closePath();
  return this;
};
Arrow.prototype.render = function(ctx){
  ctx.save();
  ctx.fillStyle = this.fillStyle;
  ctx.strokeStyle = this.strokeStyle;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  this.createPath(ctx)
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  return this;
};
// ------------------------------------
// 辅助类

/**
 * 键盘key对应的英文
 * @type {Object}
 * 使用： fq.keycode.UP 就是上方向键
 */
fq.keyCode = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  COMMAND: 15,
  SHIFT: 16,
  CONTROL: 17,
  ALTERNATE: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  NUMPAD: 21,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,

  //arrows
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  INSERT: 45,
  DELETE: 46,

  //numbers
  NUMBER_0: 48,
  NUMBER_1: 49,
  NUMBER_2: 50,
  NUMBER_3: 51,
  NUMBER_4: 52,
  NUMBER_5: 53,
  NUMBER_6: 54,
  NUMBER_7: 55,
  NUMBER_8: 56,
  NUMBER_9: 57,

  //letters
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,

  LEFT_WINDOW_KEY: 91,
  RIGHT_WINDOW_KEY: 92,
  SELECT_KEY: 93,

  //number pad
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_ADD: 107,
  NUMPAD_ENTER: 108,
  NUMPAD_SUBTRACT: 109,
  NUMPAD_DECIMAL: 110,
  NUMPAD_DIVIDE: 111,

  //function keys
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  F13: 124,
  F14: 125,
  F15: 126,

  NUM_LOCK: 144,
  SCROLL_LOCK: 145,

  //punctuation
  SEMICOLON: 186,
  EQUAL: 187,
  COMMA: 188,
  MINUS: 189,
  PERIOD: 190,
  SLASH: 191,
  BACKQUOTE: 192,
  LEFTBRACKET: 219,
  BACKSLASH: 220,
  RIGHTBRACKET: 221,
  QUOTE: 222
};

