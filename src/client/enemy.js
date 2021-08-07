class Enemy{
  constructor(initPack){
    this.x = initPack.x;
    this.y = initPack.y;
    this.radius = initPack.radius;
    this.id = initPack.id;
    this.area = initPack.area;
    this.world = initPack.world;
    this.type = initPack.type;
    this.aura = initPack.aura;

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
  }
  interp(delta){
    this.renderX = lerp(this.renderX, this.x, delta);
    this.renderY = lerp(this.renderY, this.y, delta);
  }
}