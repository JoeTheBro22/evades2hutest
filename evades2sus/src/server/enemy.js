let areaBoundaries = { x: 342.86, y: 0, width: 3085.74, height: 514.29 };

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
class Enemy {
  constructor(options) {
    Object.assign(this, options);
    this.angle = Math.random() * 6.28318531;
    this.vx = Math.cos(this.angle);
    this.vy = Math.sin(this.angle);
    this.baseVx = this.vx;
    this.baseVy = this.vy;
    this.moveSpeed = 0;
    this.moveCooldown = 0;
    this.coolType = false;
    this.x = Math.random() * areaBoundaries.width + areaBoundaries.x;
    this.y = Math.random() * areaBoundaries.height + areaBoundaries.y;
    this.baseX = this.x;
    this.baseY = this.y;
    this.toPush = false;
    this.timer = 1;
    if (this.type == "ultraspiral") {
      this.timer = Math.floor(Math.random() * 50);
    }
    this.speed /= 30;
    this.toInit = true;
    if (this.type == "tornado" || this.type == "slower" || this.type == "freezing" || this.type == "invert") {
      this.aura = 160;
    } else {
      this.aura = 0;
    }
    if (this.type == "soldier" || this.type == "creeper") {
      this.stop = 0;
      this.lastStop = 0;
    }
  }
  getUpdatePack() {
    let pack = {
      x: Math.round(this.x * 50) / 50,
      y: Math.round(this.y * 50) / 50,
      id: this.id
    };
    return pack;
  }
  getInitPack() {
    let pack = {
      x: Math.round(this.x * 50) / 50,
      y: Math.round(this.y * 50) / 50,
      radius: this.radius,
      type: this.type,
      area: this.area,
      world: this.world,
      id: this.id,
      aura: this.aura
    };
    this.toInit = false;
    return pack;
  }
  move(delta, players) {
    if (['normal', 'warp', 'cancer', 'trap', 'aaaa', 'wallsprayer', 'speeder', 'transangle', 'wipeu', 'wipeu2', 'sweepu', 'nut', 'slower', 'lag', 'spiral', 'ultraspiral', 'trolled', 'amogus', 'become', 'ok', 'lmao', 'tornado', 'unhu', 'freezing', 'invert'].includes(this.type)) {
      this.x += this.vx * this.speed * delta;
      this.y += this.vy * this.speed * delta;
    }
    if (this.type == "soldier") {
      this.stop -= delta;
      if (this.stop < 0) {
        this.x += this.vx * this.speed * delta;
        this.y += this.vy * this.speed * delta;
      }
      this.lastStop = this.stop;
    }
    if (this.type == "creeper") {
      this.stop -= delta;
      if (this.stop < 0) {
        if (this.lastStop >= 0) {
          let min = 380;
          let index;
          for (var i in players) {
            if (players[i].area == this.area && players[i].dead == false) {
              if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
                if (players[i].pos.x - players[i].radius > 342.86 && players[i].pos.x + players[i].radius < 3085.74) {
                  min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
                  index = i;
                }
              }
            }
          }
          if (index != undefined) {
            var dX = (players[index].pos.x) - this.x;
            var dY = (players[index].pos.y) - this.y;
            this.targetAngle = Math.atan2(dY, dX);
            this.vx = Math.cos(this.targetAngle);
            this.vy = Math.sin(this.targetAngle);
          }
        }
        this.x += this.vx * this.speed * delta;
        this.y += this.vy * this.speed * delta;
      }
      this.lastStop = this.stop;
    }
    if (['slower', 'tornado', 'freezing', 'invert'].includes(this.type)) {
      for (let p of Object.keys(players)) {
        const player = players[p];
        if (player.area == this.area) {
          if (distance(player.pos.x, player.pos.y, this.x, this.y) < player.radius + this.aura) {
            if (this.type == "slower") {
              player.speedMult = 0.7;
            } else if (this.type == "freezing") {
              player.speedMult = 0.3;
            } else if (this.type == "invert") {
              player.speedMult = -Math.abs(player.speedMult);
            } else if (this.type == "tornado") {
              player.pos.x += Math.cos(this.x) * 10;
              player.pos.y += Math.sin(this.y) * 10;
            }
          }
        }
      }
    }
    if (this.type == "wall") {
      //if()
      //{ x: 342.86, y: 0, width: 2057.14, height: 514.29 };
    }
    if (this.type == "become") {
      for (let playerId of Object.keys(players)) {
        const player = players[playerId];
        if (player.area == this.area) {
          if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
            player.pos.x += this.vx * this.speed * delta;
            player.pos.y += this.vy * this.speed * delta;
          }
        }
      }
    }
    if (this.type == "ok") {
      for (let playerId of Object.keys(players)) {
        const player = players[playerId];
        if (player.area == this.area) {
          if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
            this.x += player.lastVel.x * delta / 30;
            this.y += player.lastVel.y * delta / 30;
          }
        }
      }
    }
    if (this.type == "lmao") {
      this.angle = Math.atan2(this.vy, this.vx);
      this.angle += Math.random() - 0.5;
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
    }
    if (this.type == "unhu") {
      this.timer++;
      if (this.timer % 50 == 0) {
        this.vx *= -1;
        this.vy *= -1;
      }
      if (this.timer % 100 == 0) {
        this.x = this.baseX;
        this.y = this.baseY;
      }
    }

    if (this.type == "trolled") {
      for (let playerId of Object.keys(players)) {
        const player = players[playerId];
        if (player.area == this.area) {
          if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
            this.x = player.pos.x + Math.cos(this.angle) * (30 + this.radius);
            this.y = player.pos.y + Math.sin(this.angle) * (30 + this.radius);
          }
        }
      }
    }
    if (this.type == "spiral") {
      this.angle = Math.atan2(this.vy, this.vx);
      this.angle += (Math.cos(Date.now() / 1000) + 1) / 6;
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
    }
    if (this.type == "ultraspiral") {
      this.angle = Math.atan2(this.vy, this.vx);
      this.timer++;
      if (this.timer % 50 < 40) {
        this.angle += (Math.cos(Date.now() / 1000) + 1) / 6;
      }
      else {
        this.angle += (Math.cos(Date.now() / 1000)) + 1;
      }
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;

    }

    if (this.type == "B.A.L.L") {
      this.angle += Math.cos(Date.now());
      this.angle += Math.sin(Date.now());
      this.vx = this.angle * this.speed;
      this.vy = this.angle * this.speed;
      this.x += this.vx * delta;
      this.y += this.vy * delta;
    }

    if (this.type == "sidestep") {
      this.x += this.vx * this.speed * delta * (Math.cos(Date.now() / 500) + 1);
      this.y += this.vy * this.speed * delta * (Math.sin(Date.now() / 500) + 1);
    }
    if (this.type == "flappy") {
      this.x += Math.tanh(Date.now()) * this.vx * this.speed * delta;
      this.y += Math.sin(Date.now()) * this.vy * this.speed * delta;
    }
    if (this.type == "dasher") {
      this.x += this.vx * this.speed * delta * this.moveSpeed / 1.4;
      this.y += this.vy * this.speed * delta * this.moveSpeed / 1.4;
      if (this.moveCooldown <= 3000) {
        this.moveSpeed *= 0.97;
      }
      this.moveCooldown -= delta;
      if (this.moveCooldown <= 0) {
        if (this.coolType) {
          this.moveSpeed = 0.4;
          this.moveCooldown = 1200;
        }
        else {
          this.moveSpeed = 1;
          this.moveCooldown = 4000;
        }
        this.coolType = !this.coolType;
      }
    }
    // temporary
    function rand_polar() {
      return Math.random() < 0.5 ? -1 : 1;
    }
    if (this.type == "seizure") {
      this.x += Math.random() * rand_polar() * this.speed * delta;
      this.y += Math.random() * rand_polar() * this.speed * delta;
    }
    if (this.type == "weird") {
      this.x += this.vx * this.speed * delta;
      this.y += this.vy * this.speed * delta;
    }
    if (this.type == "lag") {
      this.x += Date.now() % (this.speed * 2) * delta * this.vx;
      this.y += Date.now() % (this.speed * 2) * delta * this.vy;
    }
    if (this.type == "cancer") {
      const dir = Math.atan2(this.y - this.x, this.x - this.y);
      this.x += Math.cos(dir) * this.speed * delta;
      this.y += Math.cos(dir) * this.speed * delta;
    }
    if (this.type == "rotate") {
      this.x += Math.cos(Date.now() / 1000) * this.speed * this.vy;
      this.y += Math.sin(Date.now() / 1000) * this.speed * this.vx;
    }
    if (this.type == "trap") {
      this.x += Math.tan(Date.now() / 1000) * this.speed * this.vy;
      this.y += Math.tan(Date.now() / 1000) * this.speed * this.vx;
    }
    if (this.type == "aaaa") {
      this.x += Math.asinh(Date.now() % 1000) * this.speed * this.vy;
      this.y += Math.asinh(Date.now() % 1000) * this.speed * this.vx;
    }
    if (this.type == "wallsprayer") {
      this.x += Math.clz32(Date.now() / 1000) * this.speed * this.vy * 100;
      this.y += Math.clz32(Date.now() / 1000) * this.speed * this.vx * 100;
    }
    if (this.type == "speeder") {
      this.x += Math.cbrt(Date.now() % 1000) * this.speed * this.vy;
      this.y += Math.cbrt(Date.now() % 1000) * this.speed * this.vx;
    }
    if (this.type == "transangle") {
      this.x += Math.hypot(this.x, rand_polar() * Date.now() % 5, this.x) * this.speed * this.vy / 400;
      this.y += Math.hypot(this.y, rand_polar() * Date.now() % 5, this.y) * this.speed * this.vx / 400;
    }
    if (this.type == "frog") {
      this.x += Math.atan2(this.x, Date.now() % 1000) * this.speed * this.vx * 12;
      this.y += Math.atan2(this.y, Date.now() % 1000) * this.speed * this.vy * 12;
    }
    if (this.type == "yeet") {
      //this.x += this.vx * this.speed * delta;
      //this.y += this.vy * this.speed * delta;
      this.x += Math.cosh(Math.sin(Date.now() / 100)) * this.speed * this.vx * 10;
      this.y += Math.sinh(Math.cos(Date.now() / 100)) * this.speed * this.vy * 10;
    }
    if (this.type == "sideways") {
      //this.x += this.vx * this.speed * delta;
      //this.y += this.vy * this.speed * delta;
      this.x += Math.cosh(Math.sin(Date.now())) * this.speed * this.vx * 10;
      this.y += Math.sinh(Math.cos(Date.now())) * this.speed * this.vy * 10;
    }
    if (this.type == 'diagonal') {
      this.x += this.vx * this.speed * delta;
      this.y += this.vx * this.speed * delta;
    }
    if (this.type == "tp") {
      this.timer++;
      if (this.timer % 60 == 0) {
        this.x += this.vx * this.speed * delta;
        this.y += this.vy * this.speed * delta;
      }
    }
    if (this.type == "homing") {
      let min = 200;
      let index;
      for (var i in players) {
        if (players[i].area == this.area && players[i].dead == false) {
          if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
            if (players[i].pos.x - players[i].radius > 342.86 && players[i].pos.x + players[i].radius < 3085.74) {
              min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
              index = i;
            }
          }
        }
      }
      this.angle = Math.atan2(this.vy, this.vx);
      if (index != undefined) {
        var dX = (players[index].pos.x) - this.x;
        var dY = (players[index].pos.y) - this.y;
        this.targetAngle = Math.atan2(dY, dX);
      }
      var dif = this.targetAngle - this.angle;
      var angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
      var angleIncrement = 0.04;
      if (Math.abs(angleDif) >= angleIncrement) {
        if (angleDif < 0) {
          this.angle -= angleIncrement * (20 / 30)
        } else {
          this.angle += angleIncrement * (20 / 30)
        }
      }
      this.vx = Math.cos(this.angle);
      this.vy = Math.sin(this.angle);
      this.x += this.vx * this.speed * delta;
      this.y += this.vy * this.speed * delta;
    }
    if (this.type == "liquid") {
      let closestDist = 10000;
      for (let i in players) {
        let dx = players[i].pos.x - this.x;
        let dy = players[i].pos.y - this.y;
        let dist = Math.sqrt(dx ** 2 + dy ** 2);
        if (dist < closestDist) {
          closestDist = dist;
        }
      }
      if (closestDist < 100) {
        this.x += this.vx * this.speed * delta * 2;
        this.y += this.vy * this.speed * delta * 2;
      } else {
        this.x += this.vx * this.speed * delta / 2;
        this.y += this.vy * this.speed * delta / 2;
      }
    }
    if (this.type == "wipeu") {
      this.x += Math.tan(Math.sinh(Date.now() % 5)) * this.speed * this.vx * 10;
      this.y += Math.tan(Math.cosh(Date.now() % 5)) * this.speed * this.vy * 10;
    }
    if (this.type == "wipeu2") {
      this.x += Math.sinh(Math.tan(Date.now() % 5)) * this.speed * this.vx * 10;
      this.y += Math.cosh(Math.tan(Date.now() % 5)) * this.speed * this.vy * 10;
    }
    if (this.type == "sweepu") {
      this.x += Math.clz32(Date.now() / 1000) * this.speed * this.vx * 10;
      this.y += Math.clz32(Date.now() / 1000) * this.speed * this.vx * 10;
    }
    if (this.type == "nut") {
      this.x += Math.max(-this.speed, Math.min(this.speed, (this.vx / this.vy))) * delta;
      this.y += Math.max(-this.speed, Math.min(this.speed, (this.vy / this.vx))) * delta;
    }
    if (this.type == "blind") {
      // RIP BLIND

      /*
      let closestX = 10000;
      let closestY = 10000;
      let closestDist = 10000;
      for (let i in players) {
        let dx = players[i].pos.x - this.x;
        let dy = players[i].pos.y - this.y;
        let dist = Math.sqrt(dx ** 2 + dy ** 2);
        if (dist < closestDist) {
          closestDist = dist;
          closestX = players[i].pos.x;
          closestY = players[i].pos.y;
        }
      }
      let angle = Math.atan2(this.y - closestY, this.x - closestX);
      this.x += Math.sin(angle) * this.speed * this.vx * 20;
      this.y += Math.cos(angle) * this.speed * this.vy * 20;
      */
    }
    if (['weird'].includes(this.type)) {
      if (this.x - this.radius < areaBoundaries.x) {
        this.x = areaBoundaries.x + this.radius;
        this.vx *= -0.5;
        this.vy *= 2;
      } else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
        this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
        this.vx *= -0.5;
        this.vy *= 2;
      }
      if (this.y - this.radius < areaBoundaries.y) {
        this.y = areaBoundaries.y + this.radius;
        this.vy *= -0.5;
        this.vx *= 2;
      } else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
        this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
        this.vy *= -0.5;
        this.vx *= 2;
      }
    }
    if (['warp', 'sweepu', 'cancer'].includes(this.type)) {
      if (this.x - this.radius < areaBoundaries.x) {
        this.x = areaBoundaries.x + this.radius;
        this.vx *= -1;
      } else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
        this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
        this.vx *= -1;
      }
      if (this.y - this.radius < areaBoundaries.y) {
        this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
        //this.vy *= -1;
      } else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
        this.y = areaBoundaries.y + this.radius;
        //this.vy *= -1;
      }
    }
    if (['soldier', 'creeper'].includes(this.type)) {
      if (this.x - this.radius < areaBoundaries.x) {
        this.x = areaBoundaries.x + this.radius;
        this.vx *= -1;
        this.stop = 1000 + Math.random() * 500;
      } else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
        this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
        this.vx *= -1;
        this.stop = 1000 + Math.random() * 500;
      }
      if (this.y - this.radius < areaBoundaries.y) {
        this.y = areaBoundaries.y + this.radius;
        this.vy *= -1;
        this.stop = 1000 + Math.random() * 500;
      } else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
        this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
        this.vy *= -1;
        this.stop = 1000 + Math.random() * 500;
      }
    }
    if (['normal', 'dasher', 'seizure', 'rotate', 'lag', 'homing', 'tp', 'trap', 'aaaa', 'diagonal', 'wallsprayer', 'speeder', 'liquid', 'frog', 'yeet', 'sideways', 'transangle', 'wipeu', 'wipeu2', 'nut', 'blind', 'sidestep', 'spiral', 'flappy', 'ultraspiral', 'trolled', 'amogus', 'become', 'B.A.L.L', 'ok', 'lmao', 'unhu', 'tornado', 'slower', 'freezing', 'invert'].includes(this.type)) {
      if (this.x - this.radius < areaBoundaries.x) {
        this.x = areaBoundaries.x + this.radius;
        this.vx *= -1;
      } else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
        this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
        this.vx *= -1;
      }
      if (this.y - this.radius < areaBoundaries.y) {
        this.y = areaBoundaries.y + this.radius;
        this.vy *= -1;
      } else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
        this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
        this.vy *= -1;
      }
    }
  }
}

module.exports = {
  Enemy
}