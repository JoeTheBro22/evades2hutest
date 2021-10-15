class Projectile{
  constructor(initPack){
    this.x = initPack.x;
    this.y = initPack.y;
    this.radius = initPack.radius;
    this.id = initPack.id;
    this.area = initPack.area;
    this.world = initPack.world;
    this.type = initPack.type;
    this.killed = false;
    this.guardAlertTimer = initPack.guardAlertTimer;
    if (initPack.a != undefined){
      this.angle = initPack.a;
    }
    if (initPack.e != undefined){
      this.emergency = initpack.e;
    }
    this.renderX = this.x;
    this.renderY = this.y;
  }
  updatePack(updatePack){
    if (updatePack.x != undefined){
      this.x = updatePack.x;
    }
    if (updatePack.y != undefined){
      this.y = updatePack.y;
    }
    if (updatePack.r != undefined){
      this.radius = updatePack.r;
    }
    if (updatePack.e != undefined){
      this.emergency = updatePack.e;
    }
    if (updatePack.a != undefined){
      this.angle = updatePack.a;
    }
    if (updatePack.k != undefined){
      this.killed = updatePack.k;
    }
    if (updatePack.guardAlertTimer != undefined){
      this.guardAlertTimer = updatePack.guardAlertTimer;
    }
  }
  interp(delta){
    this.renderX = lerp(this.renderX, this.x, delta);
    this.renderY = lerp(this.renderY, this.y, delta);
  }
}