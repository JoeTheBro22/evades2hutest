class Player{
  constructor(initPack){
    this.x = initPack.x;
    this.y = initPack.y;
    this.name = initPack.name;
    this.id = initPack.id;
    this.area = initPack.area;
    this.world = initPack.world;
    this.hero = initPack.hero;
    this.invincible = initPack.inv;
    this.radius = 17.14;
    this.energy = initPack.energy;
    this.maxEnergy = initPack.maxEnergy;
    this.baseRadius = this.radius;
    this.speed = initPack.speed;
    this.regen = initPack.regen;
    this.ability1cooldown = initPack.ab1cd;
    this.areaWidth = initPack.aw;
    this.areaHeight = initPack.ah;
    this.ability2cooldown = initPack.ab2cd;
    this.mousePos = initPack.msp;
    this.addEnemy = initPack.ae;
    this.warps = initPack.wps;
    this.survivalTimer = initPack.st;
    if (initPack.radius != undefined){
      this.radius = initPack.radius;
    }
    if(this.hero == "magmax"){
      this.color = "rgb(200, 0, 0)";
    }
    if(this.hero == "rameses"){
      this.color = "#989b4a";
    }
    if (this.hero == "parvulus"){
      this.color = "#9042e3";
    }
    if(this.hero == "ptah"){
      this.color = "#665333";
    }
    if (this.hero == "jotunn"){
      this.color = "#5cacff"
    }
    if (this.hero == "kindle"){
      this.color = "#ed6f3e";
    }
    if (this.hero == "neuid"){
      this.color = "#0d6d82";
    }
    if (this.hero == "orbital"){
      this.color = "#510a6e";
    }
    if (this.hero == "cimex"){
      this.color = "#777777";
    }
    if(this.hero == "janus"){
      this.color = "#8ad1bb";
    }
    if (this.hero == "turr"){
      this.color = "#bd8b0d";
    }
    if (this.hero == "gunslinger"){
      this.color = "#2b2b2b";
    }
    if (this.hero == "thornstick"){
      this.color = "#6ba72a";
    }
    if (this.hero == "warper"){
      this.color = "#8d3dad";
    }
    if (this.hero == "flylie"){
      this.color = "#de5721";
    }
    if (this.hero == "auto"){
      this.color = "rgb(128,128,128)";
    }
    if (this.hero == "rogue"){
      this.color = "#d64531";
    }
    if (this.hero == 'zenith'){
      this.color = "#443259";
    }
    if (this.hero == "pro hero xd"){
      this.color = "#0c0e4a";
    }
    if (this.hero == 'necromancer'){
      this.color = "#1c301c";
    }
    if (this.hero == "???"){
      this.color = "rgba(0,0,0,0.1)";
    }

    this.frozen = false;

    if(initPack.newt){
      this.newtonian = initPack.newt;
    }

    this.harden = false;
    this.flow = false;
    
    if(initPack.clay != undefined){
      this.clay = initPack.clay;
    }else{
      this.clay = 0;
    }
    
    this.dead = initPack.dead;
    
    if(initPack.dTimer){
      this.dTimer = initPack.dTimer;
    }else{
      this.dTimer = 60;
    }

    if (initPack.usingZ){
      this.usingZ = initPack.usingZ;
    }
    if (initPack.ret != undefined){
      this.retaliation = initPack.ret;
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
    if (updatePack.s != undefined){
      this.speed = updatePack.s;
    }
    if (updatePack.uZ != undefined){
      this.usingZ = updatePack.uZ;
    }
    if (updatePack.a != undefined){
      this.area = updatePack.a;
    }
    if (updatePack.w != undefined){
      this.world = updatePack.w;
    }
    if (updatePack.d != undefined){
      this.dead = updatePack.d;
    }
    if (updatePack.e != undefined){
      this.energy = updatePack.e;
    }
    if (updatePack.max != undefined){
      this.maxEnergy = updatePack.max;
    }
    if (updatePack.inv != undefined){
      this.invincible = updatePack.inv;
    }
    if (updatePack.ab1cd != undefined){
      this.ability1cooldown = updatePack.ab1cd;
    }
    if (updatePack.aw != undefined){
      this.areaWidth = updatePack.aw;
    }
    if (updatePack.ah != undefined){
      this.areaHeight = updatePack.ah;
    }
    if (updatePack.wps != undefined){
      this.warps = updatePack.wps;
    }
    if (updatePack.st != undefined && this.world == 'Strenuous Survival'){
      this.survivalTimer = updatePack.st;
    }
    if (updatePack.ae != undefined){
      this.addEnemy = updatePack.ae;
    }
    if (updatePack.ab2cd != undefined){
      this.ability2cooldown = updatePack.ab2cd;
    }
    if (updatePack.msp != undefined){
      this.mousePos = updatePack.msp;
    }
    if (updatePack.ret != undefined){
      this.retaliation = updatePack.ret;
    }
    if (updatePack.n != undefined){
      this.newtonian = updatePack.n;
    }
    if (updatePack.regen != undefined){
      this.regen = updatePack.regen;
    }
    if (updatePack.fr != undefined){
      this.frozen = updatePack.fr;
    }
    if (updatePack.dT != undefined){
      this.dTimer = updatePack.dT;
    }
    if (updatePack.h != undefined){
      if(updatePack.h == true){
        this.color = "rgb(120, 0, 0)";
        this.harden = true;
      }else{
        this.color = "rgb(200, 0, 0)";
        this.harden = false;
      }
    }
    if (updatePack.f != undefined){
      if(updatePack.f == true){
        this.color = "rgb(250, 100, 100)";
        this.flow = true;
      }else{
        this.color = "rgb(200, 0, 0)";
        this.flow = false;
      }
    }
    if (updatePack.c != undefined){
      this.clay = updatePack.c;
    }
    if(this.hero == "magmax"){
      if(this.harden){
        this.color = "rgba(150, 0, 0)";
      } else if(this.flow){
        this.color = "rgb(250, 100, 100)";
      } else {
        this.color = "rgba(200, 0, 0)";
      }
    }
    if(this.hero == "rameses"){
      this.color = "#989b4a";
    }
    if (this.hero == "parvulus"){
      this.color = "#9042e3";
    }
    if(this.hero == "ptah"){
      this.color = "#665333";
    }
    if (this.hero == "jotunn"){
      this.color = "#5cacff"
    }
    if (this.hero == "kindle"){
      this.color = "#ed6f3e";
    }
    if (this.hero == "neuid"){
      this.color = "#0d6d82";
    }
    if (this.hero == "orbital"){
      this.color = "#510a6e";
    }
    if (this.hero == "cimex"){
      this.color = "#777777";
    }
    if(this.hero == "janus"){
      this.color = "#8ad1bb";
    }
    if (this.hero == "turr"){
      this.color = "#bd8b0d";
    }
    if (this.hero == "gunslinger"){
      this.color = "#2b2b2b";
    }
    if (this.hero == "thornstick"){
      this.color = "#6ba72a";
    }
    if (this.hero == "warper"){
      this.color = "#8d3dad";
    }
    if (this.hero == "flylie"){
      this.color = "#de5721";
    }
    if (this.hero == "auto"){
      this.color = "rgb(128,128,128)";
    }
    if (this.hero == "rogue"){
      this.color = "rgb(235, 64, 52)";
    }
    if (this.hero == 'zenith'){
      this.color = "#443259";
    }
    if (this.hero == 'necromancer'){
      this.color = "#1c301c";
    }
    if (this.hero == "pro hero xd"){
      let amountOfBlack = 17.14*2/this.radius/10;
      let r = (255 - 12) * amountOfBlack + 12;
      let g = (255 - 14) * amountOfBlack + 14;
      let b = (255 - 74) * amountOfBlack + 74;
      this.color = "rgb(" + r + "," + g +"," + b + ")";
    }
    if (this.hero == "???"){
      if(this.flow){
        this.color = "rgba(255,100,100,0.1)";
      } else {
        this.color = "rgba(0,0,0,0.1)";
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