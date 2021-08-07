let canvas = { width: 1280, height: 720 };

class Player {
  constructor(id, client) {
    this.id = id;
    this.name = "";
    this.pos = { x: 100 + (Math.random() * 210), y: 100 + (Math.random() * 315) };
    this.areaX = 1;
    this.areaY = 1;
    this.radius = 17.14;
    this.left = false; this.right = false; this.up = false; this.down = false; this.shift = false;
    this.speed = 5;
    this.vel = { x: 0, y: 0 };
    this.inGame = false;
    this.world = "corrupted core";
    this.area = "1";
    this.oldWorld = this.world;
    this.oldArea = this.area;
    this.mouseOn = false;
    this.mousePos = { x: 0, y: 0 };
    this.teleported = false;
    this.client = client;
    this.enemyInitPack = [];
    this.enemyUpdatePack = [];
    this.enemyRemovePack = [];
    this.lastVel = {x: 0, y: 0}
	  this.op = true//false;
    this.dead = false;
    this.speedMult = 1;
    this.areaSkipLeft = false;
    this.areaSkipRight = false;
    this.hero = "";
    this.x = false;
    this.z = false;
    this.ability1 = false;
    this.ability2 = false;
    this.ability1cooldown = 0;
    this.ability2cooldown = 0;
    this.harden = false;
    this.flow = false;
    this.ability1toggler = 1;
    this.ability2toggler = 1;
    this.deadChanged = false;
    this.maxSpeedReached = false;
  }
  getUpdatePack() {
    let pack = {
      x: Math.round(this.pos.x*10)/10,
      y: Math.round(this.pos.y*10)/10,
      id: this.id,
    };
    if(this.area != this.oldArea){
      pack.area = this.area;
    }
    if(this.deadChanged){
      pack.dead = this.dead;
      this.deadChanged = false;
    }
    if(this.hero == "magmax"){
      if(this.ability1toggler == 2){
        pack.flow = true;
      }else if(this.ability1toggler == 4){
        pack.flow = false;
      }
      if(this.ability2toggler == 2){
        pack.harden = true;
      }else if(this.ability2toggler == 4){
        pack.harden = false;
      }
    }
    return pack;
  }
  getInitPack() {
    let pack = {
      x: Math.round(this.pos.x*10)/10,
      y: Math.round(this.pos.y*10)/10,
      id: this.id,
      name: this.name,
      area: this.area,
      world: this.world,
      hero: this.hero,
      dead: this.dead
    };
    if(this.hero == "magmax"){
      if(this.ability1toggler == 2){
        pack.flow = true;
      }else if(this.ability1toggler == 4){
        pack.flow = false;
      }
      if(this.ability2toggler == 2){
        pack.harden = true;
      }else if(this.ability2toggler == 4){
        pack.harden = false;
      }
    }
    return pack;
  }
  move(delta) {
    delta /= 30;

    if (this.mouseOn == false) {
      //Keyboard movement
      if (this.left) {
        this.vel.x = -this.speed;
      } else if (this.right) {
        this.vel.x = this.speed;
      }
      if (this.up) {
        this.vel.y = -this.speed;
      } else if (this.down) {
        this.vel.y = this.speed;
      }
    } else {
      //Mouse movement
      let dx = canvas.width / 2 - this.mousePos.x;
      let dy = canvas.height / 2 - this.mousePos.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      distance /= 12;
      let angle = Math.atan2(dy, dx);
      if (distance > this.speed) {
        distance = this.speed;
      }
      this.vel.x = Math.cos(angle) * distance * -1;
      this.vel.y = Math.sin(angle) * distance * -1;
    }

    if (this.shift) {
      //Shift (slows hero by 2)
      this.vel.x /= 2;
      this.vel.y /= 2;
    }

    if(this.speedMult != 1){
      this.vel.x *= this.speedMult;
      this.vel.y *= this.speedMult;
      this.speedMult = 1;
    }

    if(this.flow){
      let velDif = (this.speed + 7.5)/this.speed;
      this.vel.x *= velDif;
      this.vel.y *= velDif;
    }

    //Move hero
    if(this.dead == false && this.harden == false){
      this.pos.x += this.vel.x * delta;
      this.pos.y += this.vel.y * delta;
    }

    this.lastVel.x = this.vel.x;
    this.lastVel.y = this.vel.y;

    //Reset velocity
    this.vel.x = 0;
    this.vel.y = 0;

    //Dev hacks
    if(this.areaSkipLeft){
      this.pos.x = 69 + this.radius;
      this.areaSkipLeft = false;
    }

    if(this.areaSkipRight){
      this.pos.x = 2674.29+1028.6 - this.radius;
      this.areaSkipRight = false;
    }

    //Collisions:
    if (this.area == 1) {
      if (this.pos.x - this.radius < 0) {
        //Stops at left wall at spawn (area is 1)
        this.pos.x = this.radius;
      }
    } else if (this.pos.x - this.radius < 68.57) {
      //Goes to the end of the previous area (area is not 1)
      this.pos.x = 2674.29+1028.6 - this.radius;
      this.oldArea = this.area;
      this.area--;
      if(this.maxSpeedReached == false){
        this.speed-=2;
      }
      this.teleported = true;
    }

    if (this.area < 81) {
      if (this.pos.x + this.radius > 2674.29+1028.6) {
        //GOes to the start of the next area (area is not victory)
        this.pos.x = 69 + this.radius;
        this.oldArea = this.area;
        this.area++;
        if(this.maxSpeedReached == false){
          this.speed+=2;
        }
        this.teleported = true;
      }
    } else {
      if (this.pos.x + this.radius > 2742.86+1028.6) {
        //Reached the last area, stops at the wall (area is victory)
        this.pos.x = 2742.86+1028.6 - this.radius;
      }
    }

    if (this.pos.x - this.radius < 342.86 && this.area == 1) {
      //If area is one and it can collide with teleporters to switch world: (will need to change this when new worlds come into play)
      if (this.pos.y - this.radius < 68.57) {
        this.pos.y = 445.72 - this.radius;
        if (this.world == "corrupted core") {
          this.oldWorld = this.world;
          this.world = "corrupted core";
          //this.teleported = true;
        } else {
          this.oldWorld = this.world;
          this.world = "corrupted core";
          //this.teleported = true;
        }
      } else if (this.pos.y + this.radius > 445.72) {
        this.pos.y = 68.57 + this.radius;
        if (this.world == "corrupted core") {
          this.oldWorld = this.world;
          this.world = "corrupted core";
          //this.teleported = true;
        } else {
          this.oldWorld = this.world;
          this.world = "corrupted core";
          //this.teleported = true;
        }
      }
    } else {
      //Normal wall collision
      if (this.pos.y - this.radius < 0) {
        this.pos.y = this.radius;
      } else if (this.pos.y + this.radius > 514.29) {
        this.pos.y = 514.29 - this.radius;
      }
    }

    if(this.speed > 17){
      this.maxSpeedReached = true;
      this.speed = 17;
    }
  }
  ability(){
    if(this.hero == "magmax"){
      if(this.dead == false){
        if(this.harden == false){
          if(this.z){
            if(this.ability1toggler == 1){
              this.flow = true;
              this.ability1toggler = 2;
            }else if(this.ability1toggler == 3){
              this.flow = false;
              this.ability1toggler = 4;
            }
          }else{
            if(this.ability1toggler == 2){
              this.ability1toggler = 3;
            }else if(this.ability1toggler == 4){
              this.ability1toggler = 1;
            }
          }
        }

        if(this.x){
          if(this.ability2toggler == 1){
            this.harden = true;
            this.ability2toggler = 2;
          }else if(this.ability2toggler == 3){
            this.harden = false;
            this.ability2toggler = 4;
          }
        }else{
          if(this.ability2toggler == 2){
            this.ability2toggler = 3;
          }else if(this.ability2toggler == 4){
            this.ability2toggler = 1;
          }
        }
      }else{
        this.harden = false;
        this.flow = false;
        this.ability1toggler = 1;
        this.ability2toggler = 1;
      }
    }
  }
}

module.exports = {
  Player
}