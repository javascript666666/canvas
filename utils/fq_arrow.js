// 箭头
const Arrow = function(props){
  this.x = 100;
  this.y = 100;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.w = 60;
  this.h = 30;
  this.scaleX = 1;
  this.scaleY = 1;
  this.rotation = 0;
  this.fillStyle = 'rgb(57, 119, 224)';
  this.strokeStyle = 'rgba(0, 0, 0, 0)';
  fq.extend(this, props, true);
  return this;
}
Arrow.prototype.createPath = function(ctx){
  ctx.beginPath();
  ctx.moveTo(0 - this.w/2, 0 - this.h/2);
  ctx.lineTo(0 + this.w/6, 0 - this.h/2);
  ctx.lineTo(0 + this.w/6, 0 - this.h);
  ctx.lineTo(0 + this.w/1.5, 0);
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