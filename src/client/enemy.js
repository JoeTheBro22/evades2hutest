class Enemy{
  constructor(initPack){
    this.x = initPack.x;
    this.y = initPack.y;
    this.radius = initPack.r;
    this.id = initPack.id;
    this.area = initPack.a;
    this.world = initPack.w;
    this.type = initPack.t;
    this.aura = initPack.au;
    this.disabled = initPack.d;
    this.shattered = initPack.s;
    this.dead = initPack.dea;
    this.ignited = initPack.ig;
    this.pulseTimer = initPack.pt;
    this.friend = initPack.f;

    this.renderX = this.x;
    this.renderY = this.y;
    this.decay = initPack.de;
  }
  updatePack(updatePack){
    if(updatePack.i != undefined){
      this.x = updatePack.i[0];
      this.y = updatePack.i[1];
    }
    if(updatePack.x != undefined){
      this.x = updatePack.x;
    }
    if(updatePack.y != undefined){
      this.y = updatePack.y;
    }
    if (updatePack.r != undefined){
      this.radius = updatePack.r;
    }
    if (updatePack.t != undefined){
      this.type = updatePack.t;
    }
    if (updatePack.d != undefined){
      this.disabled = updatePack.d;
    }
    if (updatePack.de != undefined){
      this.decay = updatePack.de;
    }
    if (updatePack.s != undefined){
      this.shattered = updatePack.s;
    }
    if (updatePack.f != undefined){
      this.friend = updatePack.f;
    }
    if (updatePack.dea != undefined){
      this.dead = updatePack.dea;
    }
    if (updatePack.ig != undefined){
      this.ignited = updatePack.ig;
    }
    if(updatePack.pt != undefined){
      this.pulseTimer = updatePack.pt;
    }
  }
  interp(delta){
    this.renderX = lerp(this.renderX, this.x, delta);
    this.renderY = lerp(this.renderY, this.y, delta);
  }
}