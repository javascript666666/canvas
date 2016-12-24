/*
  生成小球的类
*/
var Ball = function(props){
  this.id = '';
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.fillStyle = 'rgb(209, 119, 165)';
  this.scrokeStyle = 'rgb(0, 0, 0)';
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.x3d = 0;
  this.y3d = 0;
  this.z3d = 0;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.xa = 0;
  this.ya = 0;
  this.za = 0;
  this.alpha = 1;

  utils.extend(this, props);
  return this;
}

Ball.prototype.render = function(ctx){
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.strokeStyle = this.styleStyle;
  ctx.fillStyle = this.fillStyle;
  ctx.beginPath();
  ctx.arc(0, 0, this.r, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  return this;
};

















//
