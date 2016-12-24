/*
  生成箭头的类 需要制定绘制的坐标 以及箭头的宽高，其中中心坐标是箭头的中心点
*/
var Arrow = function(props){
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;
  this.rotation = 0;
  this.fillStyle = 'rgba(221, 96, 50, 0.6)';
  this.scrokeStyle = 'rgb(205, 185, 100)';
  utils.extend(this, props, true);
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
  ctx.strokeStyle = this.scrokeStyle;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  this.createPath(ctx)
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
