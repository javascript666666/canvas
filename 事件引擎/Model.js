/**
 * canvas 顶层容器对象
 * @所有对象需要实现 isPointInPath 接口
 */
var Model = function (props){
  this.chidren = [];
  return this;
};
Model.prototype.add = function(child){
  this.chidren.push(child);
  return this;
};
Model.prototype.getTarget = function(mouse){
  for(var i = this.chidren.length - 1; i >= 0; i--){
    if(this.chidren[i].isPointInPath(mouse)){
      return this.chidren[i];
    }
  }
  return null;
};

Model.prototype.isEmptyObject = function(obj){
  var i = 0;
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      i++;
    }
  }
  return i;
}