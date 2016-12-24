/**
 * 事件分发系统
 * @version 0.1
 * @param {canvas对象} ele   
 * @param {顶层容器对象} model 
 */
var EventEngine = function(ele, model){
  if(typeof ele == undefined || !(ele instanceof HTMLCanvasElement)){
    throw new Error('The canvas element is not defined!')
    return;
  }
  
  this.ele = ele;
  this.model = model;  // 顶层对象模型 可理解为document
  /**
   * 事件缓存对象
   * 为什么要把事件缓存起来？
   * 比如 mousemove keydown 等事件，1秒钟可以触发很多次
   * 也就是说会在一fps里面会触发多次
   * 会影响性能，这只是其一
   */
  this.mouseCache = {};
  this.mouse = {x: 0, y: 0, deltaX: 0, deltaY: 0, lastX: 0, lastY: 0}; // 鼠标坐标缓存
  
  this.lastDownEle = null;
  this.lastOver = null;
  
  return this;
};
// 在canvas上绑定事件
EventEngine.prototype.init = function(){
  /**
   * 缺失功能：对移动端兼容性处理
   */
  this.ele.addEventListener('mousedown', this.mousedown.bind(this));
  this.ele.addEventListener('mousemove', this.mousemove.bind(this));
  this.ele.addEventListener('mouseup', this.mouseup.bind(this));
  
  return this;
};

EventEngine.prototype.mousedown = function(e){
  e = e || window.event;
  e.preventDefault();
  this._updateMouse(e);
  this.mouseCache.mousedown = true;
  return this;
};
EventEngine.prototype.mousemove = function(e){
  e = e || window.event;
  e.preventDefault();
  this._updateMouse(e);;
  this.mouseCache.mousemove = true;
  return this;
};
EventEngine.prototype.mouseup = function(e){
  e = e || window.event;
  e.preventDefault();
  this._updateMouse(e);
  this.mouseCache.mouseup = true;
  return this;
};
// 更新鼠标坐标
EventEngine.prototype._updateMouse = function(e){
  var x, y;
  if(typeof e.offsetX !== 'undefined' && typeof e.offsetY !== 'undefined'){
    x = e.offsetX;
    y = e.offsetY;
  }else{
    var rect = this.ele.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;
  }
  this.mouse.x = x;
  this.mouse.y = y;
  return this;
};

// 事件分发处理函数
// 每一帧需要做 清除画布 更新逻辑 渲染 
// 现在需要加上事件分发
EventEngine.prototype.dispatch = function(){
  var ele = null;
  // 判断鼠标缓存对象 是否为空
  if(this.model.isEmptyObject(this.mouseCache)){
    // 根据当前鼠标所在位置，获取所在的对象
    ele = this.model.getTarget(this.mouse);
    this.mouseCache.mousedown && this.mouseDownDispatch(ele);
    this.mouseCache.mousemove && this.mouseMoveDispatch(ele);
    this.mouseCache.mouseup && this.mouseUpDispatch(ele);
    // 处理完事件，清除缓存
    this.mouseCache = {};
  }
  
  // 以下为鼠标事件对象添加自定义属性 可扩展
  this.mouse.deltaX = this.mouse.x - this.mouse.lastX;
  this.mouse.deltaY = this.mouse.y - this.mouse.lastY;
  
  this.mouse.lastX = this.mouse.x;
  this.mouse.lastY = this.mouse.y;
  
  return this;
};

EventEngine.prototype.mouseDownDispatch = function(ele){
  this._trigger(this.lastDownEle = ele, 'mousedown');
  return this;
};
EventEngine.prototype.mouseMoveDispatch = function(ele){
  // 如果是鼠标按下的状态，那么 this.lastDownEle 是按下时候的对象
  // 那么不论是否再移动到其他对象身上，都只触发按下元素的 mousemove 事件
  if(this.lastDownEle) return this._trigger(this.lastDownEle, 'mousemove');
  
  // 如果说移动到某个对象身上了，那么进行判断
  if(ele){ 
    // 一开始 this.lastOver = null 所以第一个if肯定走
    if(this.lastOver != ele){
      // 第一次触发 canvas 的 mousemove this.lastOver = null
      // 这个判断不会走
      // 第二次重复啊 canvas 的 mousemove 事件
      // 如果此时 上次被赋值的 this.lastOver ！= 当前的元素
      // 那么正面鼠标已经离开了上次触发 mousemover 的元素
      if(this.lastOver) this._trigger(this.lastOver, 'mouseout');
      // 那么让this.lastOver = 当前的元素
      this.lastOver = ele;
      // 这样做的目的是 如果第二次触发 mousemove 
      // 那么 this.lastOver != ele 不成立 
      // 所以只会触发下面这一次 mouseover
      this._trigger(ele, 'mouseover');
    }
    this._trigger(ele, 'mousemove');
  }else{
    // 当鼠标此时的点下面 没有任何对象，但是 this.lastOver 如果有值
    // 只能说明一件事，此时鼠标离开了对象，并且鼠标下面没有其他对象
    // 所以要触发 this.lastOver 的 mouseout事件
    if(this.lastOver){
      this._trigger(this.lastOver, 'mouseout');
      // 这一句很重要，离开后需要清空
      // 否则下次移动鼠标 会一直触发 mouseout 事件
      // 这就做到了防止多次触发
      this.lastOver = null;
    }
  }
  
  return this;
};
EventEngine.prototype.mouseUpDispatch = function(ele){
  if(ele){ //如果鼠标抬起时候下面有精灵对象或者绘图对象
    // 触发mouseup事件
    this._trigger(ele, 'mouseup');
    // 如果抬起鼠标的对象和按下的对象是同一个那么触发click事件
    if(ele === this.lastDownEle){
      this._trigger(ele, 'click');
    }
  }
  // 如果按下某个元素 然后移开这个元素抬起鼠标，那么会触发mouseout事件
  // if(this.lastDownEle && this.lastDownEle != ele){
  //   this._trigger(this.lastDownEle, 'mouseut');
  // }
  // 鼠标抬起后，this.lastDownEle 就没有存在的必要了
  // 初始化为空，等待下次mousedown事件触发重新赋值
  this.lastDownEle = null;
  
  return this;
};

EventEngine.prototype._trigger = function(ele, type){
  // 每个canvas精灵对象或者绘制对象，已经继承事件对象的接口
  if(!ele) return this;
  var evt = {
    target: ele,
    type: type,
    // offsetX: this.mouse.x,
    // offsetY: this.mouse.y
    mouse: this.mouse
  };
  ele.trigger(type, evt);
  return this;
};

















