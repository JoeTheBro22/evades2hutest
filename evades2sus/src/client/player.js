class Player{
  constructor(initPack){
    this.x = initPack.x;
    this.y = initPack.y;
    this.name = initPack.name;
    this.id = initPack.id;
    this.area = initPack.area;
    this.world = initPack.world;
    this.hero = initPack.hero;

    if(this.hero == "magmax"){
      this.color = "rgb(200, 0, 0)";
    }else if(this.hero == "rime"){
      this.color = "blue";
    }

    this.harden = false;
    this.flow = false;
    
    this.dead = initPack.dead;

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
    if (updatePack.area != undefined){
      this.area = updatePack.area;
    }
    if (updatePack.world != undefined){
      this.world = updatePack.world;
    }
    if (updatePack.dead != undefined){
      this.dead = updatePack.dead;
    }
    if (updatePack.harden != undefined){
      if(updatePack.harden == true){
        this.color = "rgb(120, 0, 0)";
        this.harden = true;
      }else{
        this.color = "rgb(200, 0, 0)";
        this.harden = false;
      }
    }
    if (updatePack.flow != undefined){
      if(updatePack.flow == true){
        this.color = "rgb(250, 100, 100)";
        this.flow = true;
      }else{
        this.color = "rgb(200, 0, 0)";
        this.flow = false;
      }
    }

    if(this.hero == "magmax"){
      if(this.harden){
        this.color = "rgb(120, 0, 0)";
      }else if(this.flow){
        this.color = "rgb(250, 100, 100)";
      }else{
        this.color = "rgb(200, 0, 0)";
      }
    }
    if(this.dead){
      this.color = "black";
      this.harden = false;
      this.flow = false;
    }
  }
  interp(delta){
    this.renderX = lerp(this.renderX, this.x, delta);
    this.renderY = lerp(this.renderY, this.y, delta);
  }
}