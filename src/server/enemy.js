const { map } = require("./map");

let areaBoundaries = { x: 342.86, y: 0, width: 3085.74, height: 514.29 };

let canvas = { width: 1280, height: 720 };

const { Projectile, createProjectile } = require("./projectiles");

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function perimeter(rect) {
	return (rect.w * 2 + rect.h * 2);
}

function rand_polar() {
	return Math.random() < 0.5 ? -1 : 1;
}

function warpAround(rect, lengthT) {
	var result = {};
	var length = lengthT % (rect.w * 2 + rect.h * 2);
	var xpos;
	var ypos;
	var dir;
	if (length < rect.w) {
		dir = 0;
		ypos = rect.y;
		xpos = rect.x + length;
	} else if (length < rect.w + rect.h) {
		dir = 1;
		xpos = rect.x + rect.w;
		ypos = rect.y + (length - rect.w)
	} else if (length < rect.w * 2 + rect.h) {
		dir = 2;
		ypos = rect.y + rect.h
		xpos = (rect.x + rect.w) - (length - (rect.w + rect.h));
	} else if (length < rect.w * 2 + rect.h * 2) {
		dir = 3;
		xpos = rect.x;
		ypos = (rect.y + rect.h) - (length - (rect.w * 2 + rect.h))
	}
	result.x = xpos;
	result.y = ypos;
	result.dir = dir;
	return result;
}

class Enemy {
	// for more ideas visit: https://hub.adiprk.repl.co/
	constructor(options) {
		Object.assign(this, options);
		if (Array.isArray(this.type)) {
			this.type = this.type[Math.floor(Math.random() * this.type.length)];
		}
		this.timer = 0;
    	this.corrosive = false;
    	this.xChanged = false;
    	this.yChanged = false;
		this.lastx = this.x;
		this.lasty = this.y;
		this.angle = Math.random() * 6.28318531;
		this.vx = Math.cos(this.angle);
		this.vy = Math.sin(this.angle);
		if (this.type == "icicle" || this.type == "rain") {
			this.vy = rand_polar();
			this.vx = 0;
		}
		if (this.type == "frog" || this.type == "evilfrog") {
			this.leap = 0;
		}
		this.switched = false;
		this.baseVx = this.vx;
		this.baseVy = this.vy;
		this.slowdown = 1;
		this.moveSpeed = 0;
		this.moveCooldown = 0;
		this.coolType = false;
		this.baseType = this.type;
		this.shattered = -1000;
		this.friend = -1000;
		this.decay = 0;
		this.dwindleFactor = 1;
		this.radiusMult = 0;
		this.lightAffected = false;
		this.speedMultBuff = false;
		this.speedAffected = false;
		if (map[this.world].width !== undefined){
			areaBoundaries.width = map[this.world].width[this.area-1];
		} else {
			areaBoundaries.width = 3085.75;
		}
		if (map[this.world].height !== undefined){
			areaBoundaries.height = map[this.world].height[this.area-1];
		} else {
			areaBoundaries.height = 514.3;
		}
		if (this.x == undefined) {
			this.x = Math.random() * (areaBoundaries.width - this.radius) + areaBoundaries.x + this.radius;
		}
		if (this.y == undefined) {
			this.y = Math.random() * (areaBoundaries.height - this.radius) + areaBoundaries.y + this.radius;
		}
		/*if(this.world != 'Strenuous Survival'){
			
		} else {
			if(Math.random() < 0.25){
				//x
				this.x = Math.random() * (areaBoundaries.width - this.radius) + areaBoundaries.x + this.radius;
				this.y = this.radius + areaBoundaries.y;
			} else if(Math.random() < 0.50){
				//y
				this.x = areaBoundaries.x + this.radius;
				this.y = Math.random() * (areaBoundaries.height - this.radius) + areaBoundaries.y + this.radius;
			} else if(Math.random() < 0.75){
				//x shifted y
				this.x = areaBoundaries.x - this.radius + areaBoundaries.width;
				this.y = Math.random() * (areaBoundaries.height - this.radius) + areaBoundaries.y + this.radius;
			} else{
				//y shifted x
				this.x = Math.random() * (areaBoundaries.width - this.radius) + areaBoundaries.x + this.radius;
				this.y = -this.radius + areaBoundaries.y + areaBoundaries.height;
			}
		}*/
		this.baseX = this.x;
		this.baseY = this.y;
		this.toPush = false;
		this.timer = 1;
		this.cycle = 0;
		if (this.type == "wavy") {
			this.dir = 1;
			this.vy = rand_polar();
			this.vx = 0;
		}
		if (this.type == "snake" || this.type == "evilsnake") {
			this.dir = 1;
		}
		if (this.type == "zoning") {
			this.zoneCooldown = Math.random() * 1000;
			this.zoneDirection = rand_polar() * Math.PI / 2;
		}
		if (this.type == "zigzag") {
			this.zigCooldown = 0;
			this.zigDirection = Math.PI / 2;
		}
		if (this.type == "switch") {
			this.timer = 0;
			if (Math.random() < 0.5) {
				this.timer = 5000;
			}
			if (this.timer >= 5000) {
				this.switched = true;
				this.deadTime = 5000;
				this.timer -= 5000;
			}
		}
		this.lastType = this.type;
		this.lastRadius = this.radius;
		this.lastLastDecay = 0;
		this.disabled = false;
		if (this.type == "turning") {
			this.turnDir = this.speed / 150 / 30;
		}
		if (this.type == "accelerating") {
			this.deadTime = 1000;
		}
		if (this.type == "radiating_bullets") {
			this.type = "octo";
		}
		if (this.type == "ultraspiral") {
			this.timer = Math.floor(Math.random() * 50);
		}
		this.changeRadius = false;
		this.speed /= 30;
		this.toInit = true;
		this.frozen = 0;
		this.ignited = false;
		this.auraRadius = 0;
		this.ignitedTimer = 0;
		if (this.type == "tornado" || this.type == "slower" || this.type == "megafreezing" || this.type == "invert" || this.type == "disabler" || this.type == "immunedisabler" || this.type == "draining" || this.type == "slippery" || this.type == "pull" || this.type == "push" || this.type == "immunepull" || this.type == "immunepush" || this.type == "spinner") {
			this.aura = 160;
		} else if(this.type == "light" || this.type == 'enemySpeed'){
			this.aura = 130;
		}else if (this.type == "freezing" || this.type == "subzero" || this.type == "megaDraining" || this.type == "immunefreezing") {
			this.aura = 100;
    } else if (this.type == "nebula") {
      this.aura = 200;
	} else if (this.type == "blackhole") {
      this.aura = 90;
    }  else if (this.type == "tpstart" || this.type == "playershield") {
		this.aura = 30 * this.radius;
	}  else if (this.type == "lifeswitcher") {
		this.aura = Math.random() * 100 + 10 + this.radius*2;
	}  else {
			this.aura = 0;
		}
		if (this.type == "soldier" || this.type == "creeper" || this.type == "tired") {
			this.stop = 0;
			this.lastStop = 0;
		}
		if (this.type == "jumper" || this.type == "eviljumper") {
			this.jumpType = false;
			this.speed *= 1.33333333;
		}
		if (this.type == "immune" || this.type == "immunedisabler" || this.type == "immunefreezing" || this.type == "immunepull" || this.type == "immunepush" || this.type == "blackhole" || this.type == 'immunetoxic') {
			this.immune = true;
		}else{
      this.immune = false;
    }
    if(this.type == "blackhole" || this.type == 'toxic'|| this.type == 'immunetoxic'){
      this.corrosive = true;
    }
		this.disabled = false;
		this.dead = false;
		this.disableTime = 0;
		this.deadTime = 0;
		this.lastIgnited = false;
		this.lastDead = false;
		this.baseRadius = this.radius;
		this.sizingRadius = this.radius;
		this.fireId = 0;
		this.fireX = 0;
		this.fireY = 0;
		this.lowRadius = this.radius / 2.5;

		// for sniper

		this.reloadTime = 3000;
		this.reloadTimer = Math.random() * 3000;

		if (this.type == "wall") {
			this.immune = true;
			var newBound = {
				x: areaBoundaries.x + this.radius,
				y: areaBoundaries.y + this.radius,
				w: areaBoundaries.width - this.radius * 2,
				h: areaBoundaries.height - this.radius * 2
			}
			var peri = perimeter(newBound) / this.count * this.index + areaBoundaries.width / 2;
			var posAround = warpAround(newBound, peri);
			this.x = posAround.x;
			this.y = posAround.y;
			this.dirAct = 1;

			if (posAround.dir == 0) {
				this.vy = 0;
				this.vx = this.dirAct;
			}
			if (posAround.dir == 1) {
				this.vx = 0;
				this.vy = this.dirAct;
			}
			if (posAround.dir == 2) {
				this.vy = 0;
				this.vx = -this.dirAct;
			}
			if (posAround.dir == 3) {
				this.vx = 0;
				this.vy = -this.dirAct;
			}
		}

		//sizing 
		this.growing = true;
		this.maxRadius = this.radius * 2.5;
		this.minRadius = this.radius / 2.5;

		if (this.type == "path") {
			this.points = [];
			for (let i of this.path) {
				this.points.push({
					x: i[0] + 342.86,
					y: i[1],
					vel: i[2]
				});
			}
			this.pointOn = 0;
			this.x = this.points[this.pointOn].x;
			this.y = this.points[this.pointOn].y;
			this.nextPoint = this.points[this.pointOn + 1];
			this.immune = true;
		}

		if(this.type == "pulse" || this.type == 'mousepulse' || (this.minTimer !== undefined && this.maxTimer !== undefined && this.minTimer !== null && this.maxTimer !== null)){
			if(this.type != 'mousepulse'){
				this.otherEnemyPulseDetector = true;
			}
			if(this.maxTimer >= 1000){
				this.pulseTimer = 1000;
			} else{
				this.pulseTimer = 0;
			}
			
			if(this.definiteOffset !== undefined){
				this.pulseTimer += this.definiteOffset;
			}
			if(this.randomOffset !== undefined){
				this.pulseTimer += this.randomOffset * Math.random();
			}
			this.pulseIncreasing = false;
			this.immune = true;
		} else{
			this.otherEnemyPulseDetector = null;
		}
	}
	getUpdatePack() {
		let pack = {
      id: this.id
		};

    if(this.xChanged){
      pack.x = Math.round(this.x);
    }
    if(this.yChanged){
      pack.y = Math.round(this.y);
    }
    

		if (this.lastRadius != this.radius || this.changeRadius == true) {
			pack.r = this.radius;
		}
		if (this.lastType != this.type) {
			pack.t = this.type;
		}
		if (this.lastDisabled != this.disabled) {
			pack.d = this.disabled;
		}
		if (this.lastDecay != this.lastLastDecay) {
			pack.de = this.lastDecay;
		}
		if (this.lastDead != this.dead) {
			pack.dea = this.dead;
		}
		if(this.pulseTimer !== undefined){
			pack.pt = this.pulseTimer;
		}
		if (this.shattered > -100) {
			pack.s = this.shattered;
		}
		if (this.friend > -100) {
			pack.f = this.friend;
		}
		if (this.ignited != this.lastIgnited) {
			pack.ig = this.ignited;
		}
		return pack;
	}
	getInitPack() {
		let pack = {
			x: Math.round(this.x),
			y: Math.round(this.y),
			r: this.radius,
			t: this.type,
			a: this.area,
			w: this.world,
			id: this.id,
			au: this.aura,
			d: this.disabled,
			de: this.lastDecay,
			s: this.shattered,
			dea: this.dead,
			ig: this.ignited,
			aur: this.auraRadius,
			pt: this.pulseTimer,
			f: this.friend,
		};
		this.toInit = false;
		return pack;
	}
	move(delta, players, enemies, projectiles) {
		if (map[this.world].width !== undefined){
			areaBoundaries.width = map[this.world].width[this.area-1];
		} else {
			areaBoundaries.width = 3085.74;
		}
		if (map[this.world].height !== undefined){
			areaBoundaries.height = map[this.world].height[this.area-1];
		} else {
			areaBoundaries.height = 514.29;
		}
		this.xChanged = false;
		this.yChanged = false;
		let lX = this.x;
		let lY = this.y;
		this.lastx = this.x;
		this.lasty = this.y;
		this.lastDead = this.dead;
		this.lastRadius = this.radius;
		this.lastType = this.type;
		this.lastDisabled = this.disabled;
		this.lastIgnited = this.ignited;
		this.slowdown = 1;
		this.disabled = false;
		this.type = this.baseType;
		if (this.type != "sizing" && this.type != 'expanding') {
			this.radius = this.baseRadius + this.radiusMult;
			if(this.radiusMult > 0){
				this.radius = Math.max(this.baseRadius + this.radiusMult, 3);
			}
			if(!this.lightAffected){
				this.radiusMult = 0;
			}
			this.lightAffected = false;
		} else {
			this.radius = this.sizingRadius;
		}
		if(this.type == "tpshooter"){
			this.xChanged = true;
			this.yChanged = true;
		}
		this.shattered -= delta;
		this.friend -= delta;
		this.frozen -= delta;
		this.deadTime -= delta;
		this.disableTime -= delta;
		let lastTimer = this.ignitedTimer;
		this.ignitedTimer -= delta;
		if (lastTimer > 0 && this.ignitedTimer <= 0) {
			if (this.deadTime < 2000) {
				this.deadTime = 2000;
				this.dead = true;
			}
		}
		if (this.ignitedTimer > 0 && this.ignitedTimer < 750) {
			for (let i of enemies) {
				if (distance(i.x, i.y, this.x, this.y) < 100 + this.radius + i.radius && distance(i.x, i.y, this.fireX, this.fireY) < 900 && i.fireId != this.fireId) {
					i.fireX = this.fireX;
					i.fireY = this.fireY;
					i.fireId = this.fireId;
					if (!i.ignited && !i.dead) {
						i.ignitedTimer = 1000;
					}
				}
			}
		}
		if (this.deadTime < 0) {
			this.dead = false;
		}
		else {
			this.dead = true;
		}
		if (this.disableTime < 0) {
			this.disabled = false;
		}
		else {
			this.disabled = true;
		}
		if (this.ignitedTimer < 0) {
			this.ignited = false;
		}
		else {
			this.ignited = true;
		}

		if (this.frozen > 0) {
			this.slowdown = 0;
		}
		if (this.dwindleTime != undefined) {
			if (this.dwindleTime < 0) {
				this.dwindleFactor = 1;
			}
			else {
				this.dwindleTime -= delta;
				this.slowdown *= this.dwindleFactor;
				this.radius *= this.dwindleFactor;
			}
		}
		if (this.retaliated != undefined) {
			this.retaliated -= delta;
			if (this.retaliated < 0) {
				this.retaliated = undefined;
			}
			this.slowdown *= 0.5;
			this.disabled = true;
		}
		this.lastLastDecay = this.lastDecay;
		this.lastDecay = this.decay;
		if (this.decay != 0 && this.decay != undefined) {
			this.slowdown *= Math.pow(0.6, this.decay);
		}
		if (this.web) {
			this.slowdown *= 0.3;
		}
		if (this.immune) {
			this.decay = 0;
			this.lastDecay = 0;
			this.shattered = -1000;
			this.friend = -1000;
			this.slowdown = 1;
			this.disabled = false;
			this.dead = false;
			this.ignited = false;
			this.frozen = -1;
		}
		let baseDelta = delta;
		delta = delta * this.slowdown;
		if(this.type == "pulse" || this.otherEnemyPulseDetector == true){
			if(this.pulseIncreasing){
				this.pulseTimer += delta;
			} else {
				this.pulseTimer -= delta;
			}

			if(this.pulseTimer > this.maxTimer){
				this.pulseIncreasing = false;
			} else if(this.pulseTimer < -this.minTimer){
				this.pulseIncreasing = true;
			}

			if(this.pulseTimer > -50 && this.pulseTimer < 50){
				if(this.pulseIncreasing){
					this.pulseTimer = this.maxTimer;
				} else {
					this.pulseTimer = -this.minTimer;
				}
				this.pulseIncreasing = !this.pulseIncreasing;
			}

			if(this.pulseTimer < 0){
				this.dead = true;
				if(this.aura > 0 || this.type == 'ice sniper' || this.type == 'sniper' || this.type == 'octo' || this.type == 'speed sniper' || this.type == 'regen sniper' || this.type == 'tpshooter'){
					this.disabled = true;
				}
			}
		} else if(this.type == 'mousepulse'){
			if(this.pulseTimer < this.maxTimer){
				this.pulseTimer += delta;
			}
			if(this.pulseTimer < 0){
				this.dead = true;
			}
			if(this.minTimer !== undefined && this.pulseTimer < -this.minTimer){
				this.pulseTimer = -this.minTimer;
			}
		}
		if (this.disabled == true) {
			if(this.type == 'frog' || this.type == 'dasher' || this.type == 'evilfrog'){
				this.x += this.vx * this.speed * delta/3;
				this.y += this.vy * this.speed * delta/3;
			} else {
				this.x += this.vx * this.speed * delta;
				this.y += this.vy * this.speed * delta;
			}
			
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
		else {
			if (this.type == "path") {
				this.pathMovement(delta);
			}
			if (["wall"].includes(this.type)) {
				this.x += this.vx * this.speed * delta;
				this.y += this.vy * this.speed * delta;
				if (this.x < areaBoundaries.x + this.radius) {
					this.x = areaBoundaries.x + this.radius;
					this.vx = 0;
					this.vy = -this.dirAct;
				}
				if (this.y < areaBoundaries.y + this.radius) {
					this.y = areaBoundaries.y + this.radius;
					this.vx = this.dirAct;
					this.vy = 0;
				}
				if (this.x > areaBoundaries.x + areaBoundaries.width - this.radius) {
					this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
					this.vx = 0;
					this.vy = this.dirAct;
				}
				if (this.y > areaBoundaries.y + areaBoundaries.height - this.radius) {
					this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
					this.vx = -this.dirAct;
					this.vy = 0;
				}
			}
			if (['normal', 'warp', 'cancer', 'trap', 'aaaa', 'wallsprayer', 'speeder', 'transangle', 'wipeu', 'wipeu2', 'sweepu', 'nut', 'slower', 'lag', 'spiral', 'ultraspiral', 'trolled', 'amogus', 'become', 'ok', 'lmao', 'tornado', 'oscillating', 'megafreezing', 'invert', 'jumper', 'subzero', 'disabler', 'retracing', 'disabled', 'immune', 'immunedisabler', 'sniper', 'tpshooter', 'octo', 'offsetocto', 'switch', 'draining', 'megaDraining', 'wavy', 'sizing', 'expanding', 'freezing', 'ice sniper', 'regen sniper', 'speed sniper', 'turning', 'accelerating', 'slippery', 'zoning', 'zigzag', 'pull', 'snake', 'rain', 'push', 'evilsnake', 'eviljumper', 'immunefreezing', 'immunepull', 'immunepush', 'nebula', 'blackhole', 'enemySpeed', 'light', 'tpstart', 'lifeswitcher', 'playershield', 'spinner', 'toxic', 'immunetoxic', 'pulse', 'mousepulse'].includes(this.type)) {
				if(!this.speedAffected){
					this.speedMultBuff = 0;
				}
				this.x += this.vx * this.speed * (1+this.speedMultBuff) * delta;
				this.y += this.vy * this.speed * (1+this.speedMultBuff) * delta;
				this.speedAffected = false;
			}
			if (this.type == "tired") {
				this.stop -= baseDelta;
				if (this.stop < 0) {
					this.x += this.vx * this.speed * delta;
					this.y += this.vy * this.speed * delta;
				}
				if (Math.random() < 0.02 && this.stop < 0) {
					this.stop = 1000;
				}
			}
      if(this.type == "nebula"){
        for (let e in enemies){
          if(enemies[e].type != "nebula" && enemies[e].type != "icicle" && enemies[e].immune == false){
            let d = distance(this.x, this.y, enemies[e].x, enemies[e].y);
            if(d < 200){
              if(d < 60){
                d = -d*1.7;
              }
              let a = Math.atan2(this.y - enemies[e].y, this.x - enemies[e].x);
              enemies[e].x += Math.cos(a) * enemies[e].speed * (d/150) * delta;
              enemies[e].y += Math.sin(a) * enemies[e].speed * (d/150) * delta;
            }
          }
        }
      }
			
			if (this.type == "scared") {
				let stop = 1;
				for (let p of Object.keys(players)) {
					const player = players[p];
					if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
						stop = 0.2;
						break;
					}
				}
				this.x += this.vx * this.speed * delta * stop;
				this.y += this.vy * this.speed * delta * stop;
			}
			if (this.type == "soldier") {
				this.stop -= baseDelta;
				if (this.stop < 0) {
					this.x += this.vx * this.speed * delta;
					this.y += this.vy * this.speed * delta;
				}
				this.lastStop = this.stop;
			}
			if (this.type == "creeper") {
				this.stop -= baseDelta;
				if (this.stop < 0) {
					if (this.lastStop >= 0) {
						let min = 380;
						let index;
						for (var i in players) {
							if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
								if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
									if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.width) {
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
			if (['sniper', 'octo', 'ice sniper', 'speed sniper', 'regen sniper', 'offsetocto', 'tpshooter'].includes(this.type)) {
				this.reloadTimer -= delta;
				if (this.type == "octo") {
					if (this.reloadTimer <= 0) {
						this.reloadTimer = this.reloadTime;
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 0 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 45 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 90 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 135 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 180 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 225 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 270 * Math.PI / 180, this.world, this.area, projectiles);
						createProjectile(this.x, this.y, "octoBullet", 8, 10, 315 * Math.PI / 180, this.world, this.area, projectiles);
					}
				} else if(this.type == 'offsetocto'){
					if (this.reloadTimer <= 0) {
						this.reloadTimer = this.reloadTime/10;
						this.cycle++;
						if(this.cycle >= 10){
							this.cycle = 0;
						}
						if(this.cycle == 0){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 0 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 1){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 36 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 2){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 72 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 3){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 108 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 4){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 144 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 5){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 180 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 6){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 216 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 7){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 252 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 8){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 288 * Math.PI / 180, this.world, this.area, projectiles);
						} else if(this.cycle == 9){
							createProjectile(this.x, this.y, "octoBullet", 8, 10, 324 * Math.PI / 180, this.world, this.area, projectiles);
						}
					}
				}else {
					let closestDist = 656.25;
					let closest;
					for (let p of Object.keys(players)) {
						const player = players[p];
						if (player.area == this.area && player.world == this.world && player.pos.x - player.radius > areaBoundaries.x && player.pos.x + player.radius < areaBoundaries.x + areaBoundaries.width && player.dead == false) {
							let dist = distance(player.pos.x, player.pos.y, this.x, this.y);
							if (dist < closestDist) {
								closestDist = dist;
								closest = player;
							}
						}
					}
					if (closest != null && this.reloadTimer <= 0) {
						this.reloadTimer = this.reloadTime;
						let type = "sniperBullet";
						if (this.type == "ice sniper") {
							type = "iceSniperBullet";
						}
						if (this.type == "regen sniper") {
							type = "regenSniperBullet";
						}
						if (this.type == "speed sniper") {
							type = "speedSniperBullet";
						}
						if(this.type == 'tpshooter'){
							type = 'tpBullet';
							createProjectile(this.x, this.y, type, this.radius/4 + 5, 10, Math.atan2(closest.pos.y - this.y, closest.pos.x - this.x), this.world, this.area, projectiles, this.id);
						} else if (this.type == "sniper") {
							createProjectile(this.x, this.y, type, this.radius / 2, 10, Math.atan2(closest.pos.y - this.y, closest.pos.x - this.x), this.world, this.area, projectiles);
						}
						else {
							createProjectile(this.x, this.y, type, 10, 16, Math.atan2(closest.pos.y - this.y, closest.pos.x - this.x), this.world, this.area, projectiles);
						}
					}
				}
			}
			if (['slower', 'tornado', 'megafreezing', 'invert', 'subzero', 'disabler', 'immunedisabler', 'draining', 'megaDraining', 'freezing', 'slippery', 'pull', 'push', 'immunefreezing', 'immunepush', 'immunepull', 'blackhole', 'tpstart', 'light', 'enemySpeed', 'lifeswitcher', 'playershield', 'spinner'].includes(this.type)) {
				for (let p of Object.keys(players)) {
					const player = players[p];
					if (player.area == this.area && player.world == this.world) {
						let _dist = distance(player.pos.x, player.pos.y, this.x, this.y)
						if (_dist < player.radius + this.aura) {
							if(this.friend < 0){
							if (player.pos.x - player.radius > 342.86 && player.pos.x + player.radius < areaBoundaries.x + areaBoundaries.width) {
								if (this.type == "slower") {
									player.speedMult = Math.min(player.speedMult, 0.7);
								} else if (this.type == "megafreezing") {
									player.speedMult = Math.min(player.speedMult, 0.3);
								} else if (this.type == "freezing" || this.type == "immunefreezing") {
									player.speedMult = Math.min(player.speedMult, 0.2);
								} else if (this.type == "subzero") {
									player.speedMult = 0.1;
								} else if (this.type == "disabler" || this.type == "immunedisabler") {
									player.disabled = true;
								} else if (this.type == "invert") {
									player.speedMult = -Math.abs(player.speedMult);
								} else if (this.type == "tornado") {
									player.pos.x += Math.cos(this.x) * 10;
									player.pos.y += Math.sin(this.y) * 10;
									player.xChanged = true;
									player.yChanged = true;
								} else if (this.type == "pull" || this.type == "immunepull") {
									if (player.dead == false) {
										let pull = 6.2 / _dist;
										let ang = Math.atan2(player.pos.y - this.y, player.pos.x - this.x);
										if(pull > 0.2){
										pull = 0.2;
										}else if(pull < -0.2){
										pull = -0.2;
										}
										player.pos.x -= (pull * Math.cos(ang)) * (baseDelta);
										player.pos.y -= (pull * Math.sin(ang)) * (baseDelta);
										player.xChanged = true;
										player.yChanged = true;
									}
								} else if (this.type == "push" || this.type == "immunepush") {
									if (player.dead == false) {
										let push = -6.2 / _dist;
										let ang = Math.atan2(player.pos.y - this.y, player.pos.x - this.x);
										if(push > 0.2){
										push = 0.2;
										}else if(push < -0.2){
										push = -0.2;
										}
										player.pos.x -= (push * Math.cos(ang)) * (baseDelta);
										player.pos.y -= (push * Math.sin(ang)) * (baseDelta);
										player.xChanged = true;
										player.yChanged = true;
									}
								} else if (this.type == "blackhole") {
									if (player.dead == false) {
										let pull = 6.2 / _dist * 10;
										let ang = Math.atan2(player.pos.y - this.y, player.pos.x - this.x);
										if(pull > 0.2){
										pull = 0.2;
										}else if(pull < -0.2){
										pull = -0.2;
										}
										player.disabled = true;
										player.pos.x -= (pull * Math.cos(ang)) * (baseDelta);
										player.pos.y -= (pull * Math.sin(ang)) * (baseDelta);
										player.xChanged = true;
										player.yChanged = true;
									}
								}  else if (this.type == "tpstart") {
									if (player.dead == false && player.harden == false) {
										player.pos.x = 100 + (Math.random() * 210);
										player.pos.y = 100 + (Math.random() * 315);
										player.xChanged = true;
										player.yChanged = true;
									}
								}else if (this.type == "playershield") {
										player.invincible = true;
										player.invincibilityTimer = 100;
										player.lastInvincible = Date.now();
								}   else if (this.type == "lifeswitcher") {
									if (player.dead == true) {
										player.dead = false;
										player.deadChanged = true;
									}
									this.disableTime = 1000;
									this.disabled = true;
								}   else if (this.type == "spinner") {
									let spinAngle = Math.atan2(player.pos.y - this.y + Math.PI/180, player.pos.x - this.x + Math.PI/180);
									player.pos.x = this.x + 30 * Math.cos(spinAngle);
									player.pos.y = this.y + 30 * Math.sin(spinAngle);
								}  else if (this.type == "draining") {
									if (player.dead == false) {
										player.energy -= baseDelta / 1000 * 16;
									}
								} else if (this.type == "megaDraining") {
									if (player.dead == false) {
										player.energy -= baseDelta / 1000 * 300;
									}
								} else if (this.type == "slippery") {
									if (player.slippery == false) {
										player.slippedvx = 0;
										player.slippedvy = 0;
										if (player.mouseOn == false) {
											//Keyboard movement
											if (player.left) {
												player.slippedvx = -player.speed;
											} else if (player.right) {
												player.slippedvx = player.speed;
											}
											if (player.up) {
												player.slippedvy = -player.speed;
											} else if (player.down) {
												player.slippedvy = player.speed;
											}

										} else {
											//Mouse movement
											let dx = canvas.width / 2 - player.mousePos.x;
											let dy = canvas.height / 2 - player.mousePos.y;
											let distance = Math.sqrt(dx * dx + dy * dy);
											distance /= 12;
											let angle = Math.atan2(dy, dx);
											if (distance > player.speed) {
												distance = player.speed;
											}
											player.slippedvx = Math.cos(angle) * distance * -1;
											player.slippedvy = Math.sin(angle) * distance * -1;
										}
										if (player.slippedvx != 0 || player.slippedvy != 0) {
											player.slipped = true;
										}
									} else {
										player.slipped = true;
									}
								}
							}
						} else {
							player.speedMult = 1.5;
						}
						}
					}
				}
			}
			if (this.type == "wall") {
				//if()
				//{ x: 342.86, y: 0, width: 2057.14, height: 514.29 };
			}
			if (this.type == "icicle") {
				this.timer -= delta;
				if (this.timer < 0) {
					this.x += this.vx * delta * this.speed;
					this.y += this.vy * delta * this.speed;
				}
				if (this.vy < 0) {
					if (this.y < 0 + this.radius) {
						this.y = 0 + this.radius;
						this.vy *= -1;
						this.timer = 2000;
					}
				} else {
					if (this.y > areaBoundaries.height - this.radius) {
						this.y = areaBoundaries.height - this.radius;
						this.vy *= -1;
						this.timer = 2000;
					}
				}
			}
			if (this.type == "switch") {
				this.timer -= delta;
				if (this.timer < 0) {
					this.switched = !this.switched;
					this.timer = 5000;
					if (this.switched) this.deadTime = Math.max(this.deadTime, 5000);
				}
			}
			if (this.type == "become") {
				for (let playerId of Object.keys(players)) {
					const player = players[playerId];
					if (player.area == this.area && player.world == this.world) {
						if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
							player.pos.x += this.vx * this.speed * baseDelta;
							player.pos.y += this.vy * this.speed * baseDelta;
              player.xChanged = true;
              player.yChanged = true;
						}
					}
				}
			}
			if (this.type == "ok") {
				for (let playerId of Object.keys(players)) {
					const player = players[playerId];
					if (player.area == this.area && player.world == this.world) {
						if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
							this.x += player.lastVel.x * baseDelta / 30;
							this.y += player.lastVel.y * baseDelta / 30;
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
			if (this.type == "oscillating") {
				this.timer++;
				if (this.timer % 50 == 0) {
					this.vx *= -1;
					this.vy *= -1;
				}
			}
			if (this.type == "retracing") {
				this.timer++;
				if (this.timer % 100 == 0) {
					this.vx *= -1;
					this.vy *= -1;
				}
				if (this.timer % 100 == 30) {
					this.vx *= -1;
					this.vy *= -1;
				}
				if (this.timer % 100 > 80) {
					this.angle = Math.atan2(this.vy, this.vx);
					this.angle += 1 / 20 * 3.141592653589;
					this.vx = Math.cos(this.angle);
					this.vy = Math.sin(this.angle);
				}
			}

			if (this.type == "trolled") {
				for (let playerId of Object.keys(players)) {
					const player = players[playerId];
					if (player.area == this.area && player.world == this.world) {
						if (distance(player.pos.x, player.pos.y, this.x, this.y) < 200) {
							this.x = player.pos.x + Math.cos(this.angle) * (30 + this.radius);
							this.y = player.pos.y + Math.sin(this.angle) * (30 + this.radius);
						}
					}
				}
			}
			if (this.type == "wavy") {
				this.timer -= delta;
				if (this.timer < 0) {
					this.timer = 400;
					this.dir *= -1;
				}

				this.angle = Math.atan2(this.vy, this.vx);
				this.angle += (this.speed + 6) / 100 * this.dir * delta / 30;
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if (this.type == "snake") {
				this.timer -= delta;
				if (this.timer < 0) {
					this.timer = 400;
					this.dir *= -1;
				}

				this.angle = Math.atan2(this.vy, this.vx);
				this.angle += (this.speed + 6) / 100 * this.dir * delta / 30;
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if (this.type == "evilsnake") {
				this.angle = Math.atan2(this.vy, this.vx);
				if (this.timer < 200) {
					let min = 600;
					let index;
					for (var i in players) {
						if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
							if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
								if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
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
					}
				}
				this.timer -= delta;
				if (this.timer < 0) {
					this.timer = 400;
					this.dir *= -1;
				}

				this.angle += (this.speed + 6) / 100 * this.dir * delta / 30;
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if (this.type == "zoning") {
				this.angle = Math.atan2(this.vy, this.vx);
				this.zoneCooldown -= baseDelta;
				if (this.zoneCooldown < 0) {
					this.angle += this.zoneDirection;
					this.zoneCooldown = 1000;
				}
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if (this.type == "zigzag") {
				this.angle = Math.atan2(this.vy, this.vx);
				this.zigCooldown -= baseDelta;
				if (this.zigCooldown < 0) {
					this.angle += Math.PI * this.zigDirection;
					this.zigDirection *= -1;
					this.zigCooldown = 500;
				}
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if (this.type == "spiral") {
				this.angle = Math.atan2(this.vy, this.vx);
				this.angle += (Math.cos(Date.now() / 1000) + 1) / 6;
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if (this.type == "turning") {
				this.angle = Math.atan2(this.vy, this.vx);
				this.angle += this.turnDir * delta;
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
			}
			if(this.type == 'accelerating'){
				this.vx += 0.0001*delta;
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
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
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
				this.moveCooldown -= baseDelta;
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
				/*this.x += Math.atan2(this.x, Date.now() % 1000) * this.speed * this.vx * delta / 2;
				this.y += Math.atan2(this.y, Date.now() % 1000) * this.speed * this.vy * delta / 2;*/
				this.leap -= delta / 30 * this.speed / 60 * Math.random();
				this.leap -= delta / 30 * this.speed / 60 * Math.random();
				if (this.leap < 0) {
					this.leap = this.speed
				}
				this.x += this.leap * this.vx * delta;
				this.y += this.leap * this.vy * delta;
			}
			if (this.type == "evilfrog") {
				if (this.leap == this.speed) {
					let min = 200;
					let index;
					for (var i in players) {
						if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
							if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
								if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
									min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
									index = i;
								}
							}
						}
					}
					if (index != undefined) {
						var dX = (players[index].pos.x) - this.x;
						var dY = (players[index].pos.y) - this.y;
						let angle = Math.atan2(dY, dX);
						this.vx = Math.cos(angle);
						this.vy = Math.sin(angle);
					}
				}
				this.leap -= delta / 30 * this.speed / 60 * Math.random();
				this.leap -= delta / 30 * this.speed / 60 * Math.random();
				if (this.leap < 0) {
					this.leap = this.speed
				}
				this.x += this.leap * this.vx * delta;
				this.y += this.leap * this.vy * delta;
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
				if (this.timer % 30 == 0) {
					this.x += this.vx * this.speed * delta * 30;
					this.y += this.vy * this.speed * delta * 30;
				}
			}
			if (this.type == "glitch") {
				this.timer++;
				this.x += this.vx * this.speed * delta * (0.5 + ((Math.cos(Date.now() / 100) + 1) / 2));
				this.y += this.vy * this.speed * delta * (0.5 + ((Math.sin(Date.now() / 100) + 1) / 2));
				if (this.timer > 20) {
					this.x += this.vx * this.speed * delta * 10;
					this.y += this.vy * this.speed * delta * 10;
					this.timer = Math.random() * 10;
				}
			}
			if (this.type == "homing" || this.type == "superhoming") {
				let min = 200;
				let index;
				for (var i in players) {
					if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
						if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
							if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
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

					if(this.type == "homing"){
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
					} else {
						this.angle = this.targetAngle;
					}
				}
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
				this.x += this.vx * this.speed * delta;
				this.y += this.vy * this.speed * delta;
			}
			if (this.type == "sneaky") {
				let min = 400;
				let index;
				for (var i in players) {
					if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
						if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
							if ((players[i].lastVel.x > 0 && this.x < players[i].pos.x) || (players[i].lastVel.x < 0 && this.x > players[i].pos.x)) {
								if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
									min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
									index = i;
								}
							}
						}
					}
				}
				this.angle = Math.atan2(this.vy, this.vx);
				if (index != undefined) {
					var dX = (players[index].pos.x) - this.x;
					var dY = (players[index].pos.y) - this.y;
					this.targetAngle = Math.atan2(dY, dX);

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
				}
				this.vx = Math.cos(this.angle);
				this.vy = Math.sin(this.angle);
				this.x += this.vx * this.speed * delta;
				this.y += this.vy * this.speed * delta;
			}
			if (this.type == "liquid") {
				let closestDist = 10000;
				let min = 200;
				let index;
				for (var i in players) {
					if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
						if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
							if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
								min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
								index = i;
							}
						}
					}
				}
				if (min < 200) {
					this.x += this.vx * this.speed * delta * 5;
					this.y += this.vy * this.speed * delta * 5;
				} else {
					this.x += this.vx * this.speed * delta;
					this.y += this.vy * this.speed * delta;
				}
			}
			if (this.type == "expanding") {
				let closestDist = 10000;
				let min = 200;
				let index;
				for (var i in players) {
					if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
						if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
							if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
								min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
								index = i;
							}
						}
					}
				}
				if (min < 200) {
					this.sizingRadius += ((delta / 30) * 0.3) * this.lowRadius;
					if (this.radius > this.maxRadius) {
						this.radius = this.maxRadius;
					}
				} else {
					if(this.sizingRadius > this.lowRadius){
						this.sizingRadius -= ((delta / 30) * 0.2) * this.lowRadius;
					}
					if (this.radius < this.minRadius) {
						this.radius = this.minRadius;
					}
				}
				this.changeRadius = true;
			}
      if (this.type == "mine") {
				let closestDist = 10000;
				let min = 250;
				let index;
				for (var i in players) {
					if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
						if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
							if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
								min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
								index = i;
							}
						}
					}
				}
				if (min < 250) {
					this.x += this.vx * this.speed * delta;
					this.y += this.vy * this.speed * delta;
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
			if (this.type == "sizing") {
				if (this.growing) {
					this.sizingRadius += ((delta / 30) * 0.08) * this.lowRadius;
					//this.sizingRadius = this.radius;
					if (this.radius > this.maxRadius) {
						this.growing = false;
            this.radius = this.maxRadius;
					}
				} else {
					this.sizingRadius -= ((delta / 30) * 0.08) * this.lowRadius;
					//this.sizingRadius = this.radius;
					if (this.radius < this.minRadius) {
						this.growing = true;
            this.radius = this.minRadius;
					}
				}
				this.changeRadius = true;
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
			if (['warp', 'sweepu', 'cancer', 'rain'].includes(this.type)) {
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
			if (['normal', 'accelerating', 'dasher', 'seizure', 'rotate', 'lag', 'homing', 'superhoming', 'tp', 'glitch', 'trap', 'aaaa', 'diagonal', 'wallsprayer', 'speeder', 'liquid', 'expanding', 'mine', 'frog', 'yeet', 'sideways', 'transangle', 'wipeu', 'wipeu2', 'nut', 'blind', 'sidestep', 'spiral', 'flappy', 'ultraspiral', 'trolled', 'amogus', 'become', 'B.A.L.L', 'ok', 'lmao', 'oscillating', 'tornado', 'slower', 'megafreezing', 'invert', 'tired', 'subzero', 'disabler', 'retracing', 'disabled', 'immune', 'immunedisabler', 'sniper', 'tpshooter', 'octo', 'offsetocto', 'switch', 'wavy', 'draining', 'megaDraining', 'sizing', 'freezing', 'ice sniper', 'regen sniper', 'speed sniper', 'slippery', 'zoning', 'zigzag', 'pull', 'snake', 'scared', 'sneaky', 'push', 'evilfrog', 'evilsnake', 'immunefreezing', 'nebula', 'immunepull', 'immunepush', 'blackhole', 'tpstart', 'enemySpeed', 'light', 'lifeswitcher', 'playershield', 'spinner', 'toxic', 'immunetoxic', 'pulse', 'mousepulse'].includes(this.type)) {
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
			if (this.type == "turning") {
				if (this.x - this.radius < areaBoundaries.x) {
					this.vx = Math.abs(this.vx);
					this.x = areaBoundaries.x + this.radius;
					this.turnDir = -this.turnDir;
				} else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
					this.vx = -Math.abs(this.vx);
					this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
					this.turnDir = -this.turnDir;
				}
				if (this.y - this.radius < areaBoundaries.y) {
					this.vy = Math.abs(this.vy);
					this.y = areaBoundaries.y + this.radius;
					this.turnDir = -this.turnDir;
				} else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
					this.vy = -Math.abs(this.vy);
					this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
					this.turnDir = -this.turnDir;
				}
			}
			if (['jumper', 'eviljumper'].includes(this.type)) {
				let bounce = false;
				if (this.x - this.radius < areaBoundaries.x) {
					this.x = areaBoundaries.x + this.radius;
					this.vx *= -1;
					if (this.jumpType) {
						this.speed *= 2;
					}
					else {
						this.speed *= 1 / 2;
					}
					this.jumpType = !this.jumpType;
					bounce = true;
				} else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
					this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
					this.vx *= -1;
					if (this.jumpType) {
						this.speed *= 2;
					}
					else {
						this.speed *= 1 / 2;
					}
					this.jumpType = !this.jumpType;
					bounce = true;
				}
				if (this.y - this.radius < areaBoundaries.y) {
					this.y = areaBoundaries.y + this.radius;
					this.vy *= -1;
					if (this.jumpType) {
						this.speed *= 2;
					}
					else {
						this.speed *= 1 / 2;
					}
					this.jumpType = !this.jumpType;
					bounce = true;
				} else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
					this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
					this.vy *= -1;
					if (this.jumpType) {
						this.speed *= 2;
					}
					else {
						this.speed *= 1 / 2;
					}
					this.jumpType = !this.jumpType;
					bounce = true;
				}
				if (bounce == true) {
					if (this.type == "eviljumper") {
						let min = 600;
						let index;
						for (var i in players) {
							if (players[i].area == this.area && players[i].world == this.world && players[i].dead == false) {
								if (distance(this.x, this.y, players[i].pos.x, players[i].pos.y) < min) {
									if (players[i].pos.x - players[i].radius > areaBoundaries.x && players[i].pos.x + players[i].radius < areaBoundaries.x + areaBoundaries.width) {
										min = distance(this.x, this.y, players[i].pos.x, players[i].pos.y);
										index = i;
									}
								}
							}
						}
						if (index != undefined) {
							var dX = (players[index].pos.x) - this.x;
							var dY = (players[index].pos.y) - this.y;
							let angle = Math.atan2(dY, dX);
							this.vx = Math.cos(angle);
							this.vy = Math.sin(angle);
						}
					}
				}
			}
		}
		this.decay = 0;
		this.web = false;
    if(lX != this.x){
      this.xChanged = true;
    }
    if(lY != this.y){
      this.yChanged = true;
    }
	}
	pathMovement(delta) {
		let dx = this.nextPoint.x - this.points[this.pointOn].x;
		let dy = this.nextPoint.y - this.points[this.pointOn].y;
		let dir = Math.atan2(dy, dx);
		let oldSignX = Math.sign(this.nextPoint.x - this.x)
		let oldSignY = Math.sign(this.nextPoint.y - this.y);
		this.x += Math.cos(dir) * this.points[this.pointOn].vel * delta / 30;
		this.y += Math.sin(dir) * this.points[this.pointOn].vel * delta / 30;
		let newSignX = Math.sign(this.nextPoint.x - this.x)
		let newSignY = Math.sign(this.nextPoint.y - this.y);
		if (oldSignX != newSignX || oldSignY != newSignY) {
			let over = distance(this.nextPoint.x, this.nextPoint.y, this.x, this.y);
			over /= this.points[this.pointOn].vel
			this.x = this.nextPoint.x;
			this.y = this.nextPoint.y;
			this.pointOn++;
			if (this.points[this.pointOn] == undefined) {
				this.pointOn = 0;
			}
			if (this.points[this.pointOn + 1] != undefined) {
				this.nextPoint = this.points[this.pointOn + 1];
			}
			else {
				this.nextPoint = this.points[0];
			}
			this.pathMovement(over);
		}
	}
}

module.exports = {
	Enemy
}
