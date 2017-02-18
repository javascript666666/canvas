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
  this.r = 20;
  this.ss = 'rgba(0, 0, 0, 0)';
  this.fs = 'rgb(57, 119, 224)';
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